---
sidebar_position: 9
title: "13장 타입스크립트와 객체 지향"
description: 책을 전부 읽었다.
authors: [MtypEyuc]
tags: [typescript]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

## 1. <span style={{ color: '#ffd33d' }}> 타입스크립트의 객체 지향 </span>
객체 지향에 있어 자바스크립트는 불완전하기 때문에 타입스크립트의 접근 제어자, 추상 클래스, 추상 메서드 등의 기능을 사용해 보완할 수 있다. 점진적, 구조적, 덕 타이핑이 결합된 언어로써 객체 지향의 폭을 넓혀준다.


---
## 2. <span style={{ color: '#ffd33d' }}> 우아한형제들의 활용 방식 </span>


1. 온전히 레이아웃만 담당하는 컴포넌트 영역


2. 컴포넌트 영역 위에서 레이아웃과 비즈니스 로직을 연결해주는 커스텀 훅 영역


3. 훅 영역 위에서 객체로서 상호 협력하는 모델 영역


4. 모델 영역 위에서 API를 해석하여 모델로 전달하는 API 레이어 영역

---
>### 1. 컴포넌트 영역
```tsx
//components /CartCloseoutDialog.tsx
import { useCartStore } from "store/modules/cart";

const CartCloseoutDialog: React.VFC = () => {
    const cartStore = useCartStore();
    return (
        <Dialog
            opened={cartStore.PresentationTracker.isDialogOpen("closeout")}
            title="마감 세일이란?"
            onRequestClose={cartStore.PresentationTracker.closeDialog}
        >
            <div
                css={css`
          margin-top: 8px;
        `}
            >
                지점별 한정 수량으로 제공되는 할인 상품입니다. 재고 소진 시 가격이 달라질 수 있습니다.
                유통기한이 다소 짧으나 좋은 품질의 상품입니다.
            </div>
        </Dialog>
    );
};

export default CartCloseoutDialog;
```
- 장바구니 관련 다이얼로그로 온전히 레이아웃 영역만 담당한다. 비즈니스 로직을 구현한 코드는 스토어에 존재한다.
----
>### 2. 커스텀 훅 영역
```tsx
//store/cart.ts
class CartStore {
    public async add(target: RecommendProduct): Promise<void> {
        const response = await addToCart(
            addToCartRequest({
                auths: this.requestInfo.AuthHeaders,
                cartProducts: this.productsTracker.PurchasableProducts,
                shopID: this.shopID,
                target,
            })
        );
        return response.fork(
            (error, _, statusCode) => {
                switch (statusCode) {
                    case ResponseStatus.FAILURE:
                        this.presentationTracker.pushToast(error);
                        break;
                    case ResponseStatus.CLIENT_ERROR:
                        this.presentationTracker.pushToast("네트워크가 연결되지 않았습니다.");
                        break;
                    default:
                        this.presentationTracker.pushToast("연결 상태가 일시적으로 불안정합니다.");
                }
            },
            (message) => this.applyAddedProduct(target, message)
        );
    }
}

const [CartStoreProvider, useCartStore] = setupContext<CartStore>("CartStore");

export { CartStore, CartStoreProvider, useCartStore };
```
- 장바구니에 상품을 담는 로직을 레이아웃과 연결시켜준다.
```tsx
//serializers /cart/addToCartRequest .ts
import { AddToCartRequest } from "models/externals/Cart/Request";
import { IRequestHeader } from "models/externals/lib";
import {
    RecommendProduct,
    RecommendProductItem,
} from "models/internals/Cart/RecommendProduct";
import { Product } from "models/internals/Stuff/Product";

interface Params {
    auths: IRequestHeader;
    cartProducts: Product[];
    shopID: number;
    target: RecommendProduct;
}

function addToCartRequest({
                              auths,
                              cartProducts,
                              shopID,
                              target,
                          }: Params): AddToCartRequest {
    const productAlreadyInCart = cartProducts.find(
        (product) => product.getId() === target.getId()
    );

    return {
        body: {
            items: target.getItems().map((item) => ({
                itemId: item.id,
                quantity: getItemQuantityFor(productAlreadyInCart, item),
                salePrice: item.price,
            })),
            productId: target.getId(),
            shopId: shopID,
        },
        headers: auths,
    };
}

export { addToCartRequest };
```
- AddToCartRequest 타입의 객체를 반환하며, 매개변수(파라미터)로 받는 target은 RecommendProduct 타입을 가진다. 타입에 대한 정의는 모델에서 확인 가능하다.

---
>### 3. 모델 영역
```tsx
// models/Cart.ts
export interface AddToCartRequest {
    body: {
        shopId: number;
        items: { itemId: number; quantity: number; salePrice: number }[];
        productId: number;
    };
    headers: IRequestHeader;
}

/**
 * 추천 상품 관련 class
 */
export class RecommendProduct {
    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getThumbnail(): string {
        return this.thumbnailImageUrl;
    }

    public getPrice(): RecommendProductPrice {
        return this.price;
    }

    public getCalculatedPrice(): number {
        const price = this.getPrice();
        return price.sale?.price ?? price.origin;
    }

    public getItems(): RecommendProductItem[] {
        return this.items;
    }

    public getType(): string {
        return this.type;
    }

    public getRef(): string {
        return this.ref;
    }

    constructor(init: ICartRecommendProductResponse) {
        this.id = init.id;
        this.name = init.displayName;
        this.thumbnailImageUrl = init.thumbnailImageUrl;
        this.price = {
            sale: init.displayDiscounted
                ? {
                    price: Math.floor(init.salePrice),
                    percent: init.discountPercent,
                }
                : null,
            origin: Math.floor(init.retailPrice),
        };
        this.type = init.saleUnit;
        this.items = init.items.map((item) => {
            return {
                id: item.id,
                minQuantity: item.minCount,
                price: Math.floor(item.salePrice),
            };
        });
        this.ref = init.productRef;
    }

    private id: number;
    private name: string;
    private thumbnailImageUrl: string;
    private price: RecommendProductPrice;
    private items: RecommendProductItem[];
    private type: string;
    private ref: string;
}
```
----
>### 4. API 레이어 영역
```tsx
// APIResponse는 데이터 로드에 성공한 상태와 실패한 상태의 반환 값을 제네릭하게 표현해주는 API 응답 객체이다
// (APIResponse<OK, Error>)
interface APIResponse<OK, Error> {
    // API 응답에 성공한 경우의 데이터 형식
    ok: OK;
    // API 응답에 실패한 경우의 에러 형식
    error: Error;
}

export const addToCart = async (
    param: AddToCartRequest
): Promise<APIResponse<string, string>> => {
    return (await GatewayAPI.post<IAddCartResponse>("/v3/cart", param)).map(
        (data) => data.message
    );
};
```
---
## 3. <span style={{ color: '#ffd33d' }}> 캡슐화와 추상화 </span> 
1. 객체 지향 패러다임에서 중요한 것은 객체들이 유기적으로 협력하며 도메인을 명확하게 분리하는 것이다.
2. 컴포넌트의 상태(state)와 prop을 잘 다루는 것도 캡슐화의 일환으로, 협력 관계의 일부분이다.
3. 객체 지향에 집착하기보다는 유기적인 협력과 도메인 분리를 우선시하는 접근이 더 효과적이다.
---

## <span style={{ color: '#ffd33d' }}> 작성 후기 </span> 

1. 좋았던 점: 어떻게 타입스크립트를 사용하는지에 대해서만 생각했었지만, 책을 읽고 어째서 타입스크립트를 사용해야 하는지 생각하게 되었다.


2. 배운 점: 타입스크립트를 사용하는 방법과 사용해야 하는 이유에 대해 배우게 되었다.


3. 아쉬운 점: 예제 코드가 존재하지만 책에서 사용된 예제를 모아둔 곳이기 때문에 이해를 돕지는 못한다.


4. 향후 계획: 타입스크립트에 대한 온라인 강의를 다시 한번 들으며 복습할 것이다.

