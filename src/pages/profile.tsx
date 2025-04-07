import React from 'react';
import clsx from 'clsx';
import styles from './profile.module.css'

export default function UserProfile() {
    return (
        <div className={clsx('col col-end-12')}>
            <div className={styles.cover}></div>
            <div className={styles.content}>
                <img
                    src="img/discord.png"
                    alt="Profile"
                    className={styles.avatar}
                />
                <div className={styles.userInfo}>
                    <h2 className={styles.name}>이름</h2>
                    <p className={styles.nickname}>아이디</p>
                    <div className={styles.stats}>
                        <span> 설명 </span>
                    </div>
                </div>
                <button className={styles.Button}>버튼</button>
            </div>
        </div>
    );
}
