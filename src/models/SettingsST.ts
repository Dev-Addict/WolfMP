import {Song} from "../store/songs/types";
import PlayMode from "./PlayMode";
import PlayScope from "./PlayScope";

export default class SettingsST {
    private static instance: SettingsST;

    private playOrder: Song[] = [];
    private playMode: PlayMode = PlayMode.REPEAT;
    private playScope: PlayScope = PlayScope.NONE;
    private scopeValue: string | undefined = undefined;
    private isFav: boolean | undefined = undefined;

    private constructor() {
    }

    public static getInstance = () => {
        if (!SettingsST.instance) {
            SettingsST.instance = new SettingsST();
        }
        return SettingsST.instance;
    };

    public setSongs = (songs: Song[]) => {
        this.playOrder = songs;
        this.setPlayOrder(this.playMode);
    };

    public setPlayOrder = (playMode: PlayMode) => {
        this.playMode = playMode;
        switch (playMode) {
            case PlayMode.REPEAT:
            case PlayMode.REPEAT_SONG:
                this.playOrder = this.playOrder.sort((s1, s2) =>
                    s1.title.toLowerCase().localeCompare(s2.title.toLowerCase()));
                break;
            case PlayMode.SHUFFLE:
                this.playOrder = this.playOrder.sort(() => Math.random() - 0.5);
                break;
        }
    };

    public getNext = (currentId: string, force: boolean = false) => {
        if (this.playMode === PlayMode.REPEAT_SONG && !force)
            return this.filterPlayOrder().find(({id}) => id === currentId)!;
        const lastIndex = this.filterPlayOrder().findIndex(({id}) => id === currentId);
        return this.filterPlayOrder()[(lastIndex + 1) % this.filterPlayOrder().length];
    };

    public getPrev = (currentId: string, force: boolean = false) => {
        if (this.playMode === PlayMode.REPEAT_SONG && !force)
            return this.filterPlayOrder().find(({id}) => id === currentId)!;
        const lastIndex = this.filterPlayOrder().findIndex(({id}) => id === currentId);
        return this.filterPlayOrder()[(lastIndex + this.filterPlayOrder().length - 1) % this.filterPlayOrder().length];
    };

    setPlayScope = (playScope: PlayScope) => {
        this.playScope = playScope;
    };

    setScopeValue = (scopeValue: string | undefined) => {
        this.scopeValue = scopeValue;
    };

    setFav = (isFav: boolean | undefined) => {
        this.isFav = isFav;
    };

    private filterPlayOrder = (): Song[] => {
        let playOrder = this.playOrder;

        if (this.isFav)
            playOrder = playOrder.filter(song => song.isFav);

        switch (this.playScope) {
            case PlayScope.NONE:
                return playOrder.filter(({isExcluded}) => !isExcluded);
            case PlayScope.ALBUM:
                return playOrder.filter(({isExcluded}) => !isExcluded).filter(({album}) => album === this.scopeValue);
            case PlayScope.ARTIST:
                return playOrder.filter(({isExcluded}) => !isExcluded).filter(({artist}) => artist === this.scopeValue);
            case PlayScope.GENRE:
                return playOrder.filter(({isExcluded}) => !isExcluded).filter(({genre}) => genre === this.scopeValue);
        }
    }
}
