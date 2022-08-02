// Id	日期	主帳編號	細項編號	主分類	子分類	幣別	匯率	該幣別金額	帳務說明	標籤	發票號碼	財政部	物品名稱	數量	單價	金額
// 1	2019/08/24	1	0	收	薪水	TWD	1	6000	啟動金			0			

export enum EnumBillMainType{
    income="income",
    expenses="expenses"
}
export enum EnumBillSubType{
    salary="salary",
    food="food", 
    clothing="clothing", 
    housing="housing", // 房租 水電 瓦斯
    traffic="traffic",
    recreation="recreation"

}

export interface IMember{
    memberId: string;
    email: string;
    account:string;
    teamList?:ITeam[];
}

export interface IBill {
    id:number;
    createDate:Date; // 記錄的日期 依系統時間
    date:Date; // 消費日期
    mainType:string; // 收入支出
    subType:string; // 薪水 or 食衣住行
    amount:number; // 金額
    currency:string; // 幣別 預設NTD
    currencyRate:number; // 匯率 預設台幣 1
    describe:string; //描述 ex:牛肉麵 
    belongWho:IMember;// 此筆記帳屬於誰
    whichTeam?:ITeam
}

export interface ITeam{
    teamId:string;
    teamName:string;
    members:IMember[];
    createDate:Date;
    startDate?:Date;
    endDate?:Date;
}