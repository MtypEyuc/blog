import React from 'react';
import clsx from 'clsx';
import './styles.css';

const HomePage: React.FC = () => {
    return (
        <div className={clsx('container')}>
            <div className={'c-background'}>
            <header className={clsx('header')}>
                <h1>도큐사우루스 블로그 </h1>
            </header>

            <main className={clsx('mainContent')}>
                <div className={clsx('col', 'col--6')}>
                    <section className={clsx('section')}>
                        <h2>프로젝트 진행</h2>
                        <ul>
                            <li>요구사항을 정리하고 도식화</li>
                            <li>업무 프로세스와 기능을 단순화</li>
                            <li>사용자에 맞는 UI 제작</li>
                        </ul>
                    </section>
                </div>

                <div className={clsx('col', 'col--6')}>
                    <section className={clsx('section')}>
                        <h2>배운 내용 정리</h2>
                        <ul>
                            <li>읽고 배운 내용을 정리</li>
                            <li>주제에 벗어나지 않고 정리</li>
                            <li>예제 코드를 분석하고 정리</li>
                        </ul>
                    </section>
                </div>
            </main>

            <main className={clsx('mainContent')}>
                <div className={clsx('col', 'col--6')}>
                    <section className={clsx('section')}>
                        <h2>자기소개서</h2>
                        <ul>
                            <li>짧고 간결한 표현을 사용</li>
                            <li>이해를 돕는 시각화 자료 준비</li>
                            <li>5페이지 이내의 크기로 작성</li>
                        </ul>
                    </section>
                </div>

                <div className={clsx('col', 'col--6')}>
                    <section className={clsx('section')}>
                        <h2>회고록 작성</h2>
                        <ul>
                            <li>블로그 제작 과정을 기록</li>
                            <li>배운 내용을 정리</li>
                            <li>버전관리를 신경쓰며 커밋</li>
                        </ul>
                    </section>
                </div>
            </main>
            </div>


            <footer className={clsx('footer2')}>
            </footer>

        </div>
    );
};

export default HomePage;
