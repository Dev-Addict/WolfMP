export default class SettingsST {
    private static instance: SettingsST;

    private constructor() {
    }

    public static getInstance = async () => {
        if (!SettingsST.instance) {
            SettingsST.instance = new SettingsST();
        }
        return SettingsST.instance;
    };
}
