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

    useEffect(() => {
        // 추후 데이터베이스를 사용해 불러올 것이기 때문에 webp 이미지를 사용할 것이다.
        const fetchData = async () => {
            const data = [
                // { id: 0, name: "asdasd", date: "", description: "asd", image: "  " },
                { id: 1, date:"2025-02-03~", name:"모던-리액트-deep-dive", description: "React 및 JS, 웹 기초 강화", image: "https://cdn.discordapp.com/attachments/1338544385217921084/1338544419497967616/mrdd.jpg?ex=67ab7822&is=67aa26a2&hm=b7ec3fb9ef4a1691e4b1c014bfc1bd5fb946c97d678a7d81504345181a6deb4a&" },
                { id: 2, date:"2025-02-03~", name:"우아한-타입스크립트-with-리액트", description: "Typescript 기초 보완", image: "https://cdn.discordapp.com/attachments/1338544385217921084/1338544697987170344/wtr.jpg?ex=67ab7864&is=67aa26e4&hm=029792322e5c8a589e3e0e0d109e2fc5d8848c8c04b2d0577fcc7f4713c7ef94&" },
                { id: 3, date:"2025-02-03~", name:"구글-엔지니어는-이렇게-일한다", description: "개발 문화를 구글을 통해 간접 경험하고 프로젝트에 적용 방안 고민", image: "https://cdn.discordapp.com/attachments/1338544385217921084/1338544698301878394/gew.jpg?ex=67ab7865&is=67aa26e5&hm=b8b7a5b5bc9954bd45091322b22efa2168674dd962039e1e6789ef5c30322d97&" },
                { id: 4, name: "한-장-보고서의-정석", date: "2025-02-10~", description: "프로젝트 문서 내용을 더 효과적으로 전달하기 위한 책", image: "https://cdn.discordapp.com/attachments/1338544385217921084/1338592224056836178/dd.webp?ex=67aba4a8&is=67aa5328&hm=0b83f4ff807e748340bf4a98c0f811ac7f8a70094ab7f53806f0010a875c1172&" }
            ];
            setBooks(data);
        };
        fetchData();
    }, []);


    // 책의 이미지가 나오게 만들고 설명이 들어가야 한다. 책을 누르면 이동하는 기능을 추가했다.

    return (
        <div className="book-list">
            {books.map((books) => (
                <div key={books.id} className="book-container">
                    <div className="book-image" >
                        <Link to={`./category/${books.name}`}>
                         <img src={books.image} alt={books.name} />
                        </Link>
                    </div>
                    <div className="book-info">
                        <h2>{books.description}</h2>
                        <h5>{books.date}</h5>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default page;
