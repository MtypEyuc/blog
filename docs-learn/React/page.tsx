import React, { useEffect, useState } from "react";
import "./page.css";
import Link from "@docusaurus/Link";

//데이터 타입 정의
interface Book {
    id: number;
    name: string;
    image: string;
    description: string;
    date: string;
}

const page = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [books2, setBooks2] = useState<Book[]>([]);

    useEffect(() => {
        // 추후 데이터베이스를 사용해 불러올 것이기 때문에 webp 이미지를 사용할 것이다.
        const fetchData = async () => {
            const data = [
                // { id: 0, name: "asdasd", date: "", description: "asd", image: "  " },
                { id: 1, date:"2025-02-03~2025-02-28", name:"모던 리액트 Deep Dive", description: "React 및 JS, 웹 기초 강화", image: "../../img/모던 리액트 Deep Dive/logo.webp" },
                { id: 2, date:"2025-02-03~2025-02-21", name:"우아한 타입스크립트 with 리액트", description: "Typescript 기초 보완", image: "../../img/우아한 타입스크립트 with 리액트/logo.webp" },
                { id: 3, date:"2025-02-03~2025-02-08", name:"구글 엔지니어는 이렇게 일한다", description: "개발 문화를 구글을 통해 간접 경험하고 프로젝트에 적용 방안 고민", image: "../../img/구글 엔지니어는 이렇게 일한다/logo.webp" },
                { id: 4, name: "한 장 보고서의 정석", date: "2025-02-10~2025-03-10", description: "프로젝트 문서 내용을 더 효과적으로 전달하기 위한 책", image: "../../img/한 장 보고서의 정석/logo.webp" },
            ];
            setBooks(data);
        };
        fetchData();

        const fetchData2 = async () => {
            const data = [
                // { id: 0, name: "asdasd", date: "", description: "asd", image: "  " },
                { id: 1, date:"2025-03-01~", name:"리액트 인터뷰 가이드", description: "리액트 동향과 필수 기술을 익혀 대응 능력을 키운다", image: "../../img/리액트 인터뷰 가이드/logo.webp" },
                { id: 2, date:"2025-03-01~", name:"그림으로 공부하는 IT 인프라 구조", description: "IT 시스템의 전반적인 이해", image: "../../img/그림으로 공부하는 IT 인프라 구조/logo.webp" },
                { id: 3, date:"2025-03-01~", name:"디자인 패턴의 아름다움", description: "객체지향 프로그래밍에 대한 이해", image: "../../img/디자인 패턴의 아름다움/logo.webp" },
                { id: 4, name: "서버 인프라를 지탱하는 기술", date: "2025-03-01~", description: "서버와 인프라에 대한 이해", image: "../../img/서버 인프라를 지탱하는 기술/logo.webp" },
            ];
            setBooks2(data);
        };
        fetchData2();
    }, []);




    // 책의 이미지가 나오게 만들고 설명이 들어가야 한다. 책을 누르면 이동하는 기능을 추가했다.

    return (
        <div className="book-list">
            <div className="book-list-padding">
                <h2>학습 완료</h2>
                {books.map((books) => (
                    <div key={books.id} className="book-container">
                        <div className="book-image">
                            <Link to={`./learn_book/${books.name}`}>
                                <img src={books.image} alt={books.name}/>
                            </Link>
                        </div>
                        <div className="book-info">
                            <h2>{books.description}</h2>
                            <h5>{books.date}</h5>
                        </div>
                    </div>
                ))}
            </div>
                <div className="book-list-padding">
                    <h2>학습 진행 중</h2>
                    {books2.map((books) => (
                        <div key={books.id} className="book-container">
                            <div className="book-image">
                                <Link to={`./learn_book/${books.name}`}>
                                    <img src={books.image} alt={books.name}/>
                                </Link>
                            </div>
                            <div className="book-info">
                                <h2>{books.description}</h2>
                                <h5>{books.date}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            );
            };

            export default page;
