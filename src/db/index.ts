import * as SQLite from 'expo-sqlite';
import {SQLError, SQLResultSet, SQLTransaction} from "expo-sqlite";

const db = SQLite.openDatabase('database.db');

export const init = () => {
    return new Promise(((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS songs (id INTEGER PRIMARY KEY NOT NULL, clientId TEXT NOT NULL, title TEXT NOT NULL, album TEXT, artist TEXT, genre TEXT, isExcluded TEXT, isFav TEXT, lrcUri TEXT, coverUri TEXT, videoUri TEXT, uri TEXT NOT NULL, duration REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (sqlTransaction: SQLTransaction, sqlError: SQLError) => {
                    reject(sqlError);
                    return false;
                }
            );
        });
    }));
};

export const insertSong = (
    {
        clientId,
        title,
        album,
        artist,
        genre,
        isExcluded,
        isFav,
        lrcUri,
        coverUri,
        videoUri,
        uri,
        duration
    }: {
        clientId: string,
        title: string,
        album?: string,
        artist?: string,
        genre?: string,
        isExcluded: boolean,
        isFav: boolean,
        lrcUri?: string,
        coverUri?: string,
        videoUri?: string,
        uri: string,
        duration: number
    }): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO songs (clientId, title, album, artist, genre, isExcluded, isFav, lrcUri, coverUri, videoUri, uri, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [clientId, title, album, artist, genre, isExcluded ? 'yes' : 'no', isFav ? 'yse' : 'no', lrcUri, coverUri, videoUri, uri, duration],
                (transaction, resultSet) => {
                    resolve(resultSet);
                },
                (sqlTransaction: SQLTransaction, sqlError: SQLError) => {
                    reject(sqlError);
                    return false;
                }
            )
        })
    });
};

export const updateSong = (
    id: string, {
        clientId,
        title,
        album,
        artist,
        genre,
        isExcluded,
        isFav,
        lrcUri,
        coverUri,
        videoUri,
        uri,
        duration
    }: {
        clientId: string,
        title: string,
        album?: string,
        artist?: string,
        genre?: string,
        isExcluded: boolean,
        isFav: boolean,
        lrcUri?: string,
        coverUri?: string,
        videoUri?: string,
        uri: string,
        duration: number
    }
) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE songs SET clientId = ?, title = ?, album = ?, artist = ?, genre = ?, isExcluded = ?, isFav = ?, lrcUri = ?, coverUri = ?, videoUri = ?, uri = ?, duration = ? WHERE id = ?',
                [clientId, title, album, artist, genre, isExcluded ? 'yes': 'no', isFav ? 'yes': 'no', lrcUri, coverUri, videoUri, uri, duration, id],
                (transaction, resultSet) => {
                    resolve(resultSet);
                },
                (sqlTransaction: SQLTransaction, sqlError: SQLError) => {
                    reject(sqlError);
                    return false;
                }
            )
        })
    });
};

export const getSongs = (): any => {
    return new Promise(((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM songs',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                    return false;
                }
            )
        });
    }));
};
