import {Song} from "../store/songs/types";
import PlayMode from "./PlayMode";

export default class SettingsST {
    private static instance: SettingsST;

    private playOrder: Song[] = [];
    private playMode: PlayMode = PlayMode.REPEAT;

    private constructor() {
    }

    public static getInstance = () => {
        if (!SettingsST.instance) {
            SettingsST.instance = new SettingsST();
        }
        return SettingsST.instance;
    };

    public setSongs(songs: Song[]) {
        this.playOrder = songs;
    }

    public setPlayOrder(playMode: PlayMode) {
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
    }

    public getNext(currentId: string) {
        const lastIndex = this.playOrder.findIndex(({id}) => id === currentId);
        return this.playOrder[(lastIndex + 1) % this.playOrder.length];
    }

    public getPrev(currentId: string) {
        const lastIndex = this.playOrder.findIndex(({id}) => id === currentId);
        return this.playOrder[(lastIndex + this.playOrder.length - 1) % this.playOrder.length]
    }
}
