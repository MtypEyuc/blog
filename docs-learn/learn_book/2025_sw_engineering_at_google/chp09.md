---
sidebar_position: 2
title: "9장: 코드 리뷰"
description: 코드 리뷰
authors: [MtypEyuc]
tags: [work]
hide_table_of_contents: false
---

개발자에 있어 코드 리뷰는 중요하다. 스스로 성장하기도 하고 협업 시 지식을 공유하는 수단이 되기도 한다. 이 때 다양한 관점에서 코드를 바라볼
수 있기 때문에 이후 오류를 해결하거나 새로운 기능을 만들 때 점진적으로 적용이 가능해진다.

`Chapter 9`은 구글 엔지니어들이 코드 리뷰를 하는 방법과 모범사례에 대하여 기술하고 있다.

### 코드 리뷰는 어떻게 하는가?
- 작성자가 코드 베이스에 적용할 변경 사항을 작성하고 코드가 어떻게 달라졌는지 평가.
- 초기 패치를 사용하여 의견을 받거나 스스로 리뷰해 다수에게 리뷰를 요청.
- 리뷰어들은 문제를 던져주거나 유용한 정보를 제공.
- 작성자는 피드백을 기초로 수정하여 회신하며 이 과정은 반복될 수 있음.
- 만족한 리뷰어들은 코드에 합격 태그를 달아줄 수 있음.
- 태그가 달린 태그를 커밋하여 승인 요청.

이것이 기본적인 코드 리뷰의 흐름이다. 구글 역시 코드 리뷰를 하며 구글에서 승인을 받으려면 전문가에게 매우 엄격한 세가지 리뷰를 통과해야 한다.

- 정확성과 용이성 평가
- 전문가의 합격 태그가 필요
- 가독성 승인

여러 개의 승인이 필요한 코드 리뷰의 경우, 여러 명의 승인자가 코드를 평가하게 된다. 한 명의 전문가가 코드 리뷰를 하고 승인 처리를 할 수도 있지만 역할을
나눔으로써 코드 프로세스가 유연해지고 팀 전체의 수준이 높아지는 이점이 생겨나게 된다.

### 모범사례 
- 리뷰어는 신속하게 피드백을 제시.
- 작성자의 방식을 존중하며 리뷰.
- 배움의 자세로 코드를 리뷰.
- 요청자는 200줄 이하의 코드로 작성
- 변경에 대한 자세한 설명이 필요함.
- 리뷰어는 최소한의 인원이 투입. 첫 승인이 매우 중요하기 때문.

### 코드 리뷰 유형
- 그린필드 리뷰: 신규 프로젝트 또는 기능에 사용. 향후 확장 가능성과 유지 보수성에 중점.
- 동작 변경, 개선, 최적화
- 버그 수정과 롤백: 
- 리퍅터링과 대규모 변경

해당 챕터를 읽고, 개인과 팀을 위해서도 코드 리뷰가 매우 중요하게 작용한다는 것을 알게 되었다. 프로젝트를 진행하면서 발표 준비를 하고 코드 리뷰를 했을 때
여러가지 배울 점이 많았던 것이 기억난다. 하나의 사물을 보더라도 사람에 따라 관점이 다르고 이에 따라 새로운 발전이 가능해지기 때문에 지속적으로 적용해야 하는
프로세스라고 생각한다.

