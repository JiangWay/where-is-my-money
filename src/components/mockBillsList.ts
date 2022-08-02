import { EnumBillMainType, EnumBillSubType, IMember, IBill, ITeam } from './bill'


const member = {
    memberId: '0',
    email: 'wyntest@gmail.com',
    account: 'wyn is test'

} as IMember


const bill = {

} as IBill;

// 放在全域 避免重複
let billIdCounter = 0



export const createExpensesBills = (count: number)=>{
    const expensesBillList = [] as IBill[];
    for(let i = 0 ; i< count ; i++){
        const randomDay = Math.floor(Math.random()*31);
        const bill = {
            id: billIdCounter,
            createDate : new Date(), // 記錄的日期 依系統時間
            date:new Date(2022,6,randomDay), // 消費日期
            mainType:i%11  === 0 ? EnumBillMainType.income : EnumBillMainType.expenses, // 收入支出
            subType:EnumBillSubType.food, // 薪水 or 食衣住行
            amount:Math.floor(Math.random() * 10000 ), // 金額
            currency:'NT$', // 幣別 預設NTD
            currencyRate:1, // 匯率 預設台幣 1
            describe:'wyn test '+ i, //描述 ex:牛肉麵 
            belongWho:member,// 此筆記帳屬於誰
        }as IBill
        billIdCounter++;
        expensesBillList.push(bill)
    }
    return expensesBillList;
}


