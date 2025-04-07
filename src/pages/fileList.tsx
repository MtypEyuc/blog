import React, { useEffect, useState } from "react";
import styles from "./RecentDocs.module.css";

export default function RecentDocs() {
    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
        fetch("/filelist.json")
            .then((res) => res.json())
            .then((data: string[]) => setFiles(data));
    }, []);

    function sliceFilePath(fileName: string) {
        const parts = fileName.split("/");
        return parts.slice(2).join("/");
    }

    return (
        <div className={('col col-end-12')}>
        <div className={styles.card}>
            <h2 className={styles.title}>📄 최근 작성한 문서</h2>
            <ul className={styles.list}>
                {files.slice(0, 5).map((file, index) => {
                    const fileName = file.replace("docs/", "").replace(".md", "");
                    return (
                        <li key={index} className={styles.listItem}>
                            <a
                                href={file.replace("docs/", "/docs/")}
                                className={styles.link}
                            >
                                {sliceFilePath(fileName)}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
            </div>
    );
}
