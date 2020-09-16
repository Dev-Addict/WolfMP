import Lyrics from "../models/Lyrics";

const lrcParser = (lrcData: string) => {
    const lines = lrcData.split('\n');

    const lyrics: Lyrics = [];

    try {
        for (let i = 0; i < lines.length; i++)
            if (lines[i].match(/\[[0-9]{2}:[0-9]{2}\.[0-9]{2}]/)?.length)
                lyrics.push({
                    time: parseStringIntoSeconds(lines[i].match(/\[[0-9]{2}:[0-9]{2}\.[0-9]{2}]/)![0]),
                    text: lines[i].replace(/\[[0-9]{2}:[0-9]{2}\.[0-9]{2}]/, ''),
                    key: (Date.now() + i).toString()
                });
    } catch (err) {
        return undefined;
    }

    return lyrics;
};

const parseStringIntoSeconds = (string: string) => {
    return parseInt(string.match(/\[[0-9]{2}:/)![0].replace('[', '').replace(':', '')) * 60 +
        parseInt(string.match(/:[0-9]{2}\./)![0].replace(':', '').replace('.', '')) +
        parseInt(string.match(/\.[0-9]{2}]/)![0].replace('.', '').replace(']', '')) / 100;
};

export default lrcParser;
