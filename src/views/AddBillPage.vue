<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Header</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- fab placed to the top end -->
      <!-- <ion-fab vertical="top" horizontal="start" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        <ion-fab-list>
          <ion-fab-button color="light">
            <ion-icon name="logo-facebook"></ion-icon>
          </ion-fab-button>
          <ion-fab-button color="light">
            <ion-icon name="logo-twitter"></ion-icon>
          </ion-fab-button>
          <ion-fab-button color="light">
            <ion-icon name="logo-vimeo"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab> -->

      <ion-list lines="full" class="ion-no-margin" id="billForm">
        <ion-list-header lines="full">
          <ion-label> 輸入一筆！ </ion-label>
        </ion-list-header>
        <ion-item>
          {{ inputBillForm }}
        </ion-item>

        <ion-item>
          <ion-label>日期</ion-label>
          <ion-input
            placeholder="請輸入日期"
            type="date"
            pattern="date"
            v-model="stringDate"
          >
          </ion-input>
        </ion-item>

        <ion-item>
          <ion-label>主分類</ion-label>
          <ion-select
            interface="action-sheet"
            placeholder="選擇主分類"
            v-model="inputBillForm.mainType"
          >
            <ion-select-option value="apples">Apples</ion-select-option>
            <ion-select-option value="oranges">Oranges</ion-select-option>
            <ion-select-option value="bananas">Bananas</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>子分類</ion-label>
          <ion-select
            interface="action-sheet"
            placeholder="選擇子分類"
            v-model="inputBillForm.subType"
          >
            <ion-select-option value="apples">Apples</ion-select-option>
            <ion-select-option value="oranges">Oranges</ion-select-option>
            <ion-select-option value="bananas">Bananas</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>項目名稱</ion-label>
          <ion-input
            placeholder="placeholder"
            type="text"
            v-model="inputBillForm.desc"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>金額</ion-label>
          <ion-input
            placeholder="placeholder"
            type="decimal"
            v-model="inputBillForm.amount"
          ></ion-input>
        </ion-item>
      </ion-list>
      <ion-button expand="block" @click="saveBill()">save</ion-button>
      <ion-button expand="block" @click="getAllBills()">show</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IBill, IMember } from "@/components/bill";
import {
  IonButton,
  IonSelect,
  IonSelectOption,
  IonList,
  IonListHeader,
  IonDatetime,
  IonLabel,
  IonInput,
  IonItem,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { format } from "date-fns";
import {
  add,
  arrowBackCircle,
  arrowForwardCircle,
  arrowUpCircle,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  person,
  settings,
  share,
} from "ionicons/icons";
import { defineComponent, reactive, ref, watch } from "vue";
import { Storage } from "@capacitor/storage";

export default defineComponent({
  components: {
    IonButton,
    IonSelect,
    IonSelectOption,
    IonList,
    IonListHeader,
    // IonDatetime,
    IonLabel,
    IonInput,
    IonItem,
    IonContent,
    // IonFab,
    // IonFabButton,
    // IonFabList,
    IonHeader,
    // IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const inputBillForm = reactive({} as IBill);
    const stringDate = ref(format(new Date(), "yyyy-MM-dd"));

    console.log(inputBillForm);

    const chooseDate = ref();
    watch(
      inputBillForm,
      (nV, oV) => {
        console.log("nV = ", nV);
        console.log("oV = ", oV);
      },
      { deep: true }
    );

    const member = {
      memberId: "1",
      email: "wynfun0312@gmail.com",
      account: "wyntest",
    } as IMember;

    const saveBill = async () => {
      inputBillForm.id = 0;
      inputBillForm.createDate = new Date();
      inputBillForm.date = new Date(stringDate.value);
      inputBillForm.currency = "NTD"; // 幣別 預設NTD
      inputBillForm.currencyRate = 1;
      inputBillForm.belongWho = member;
      await Storage.set({
        key: "billList",
        value: JSON.stringify({
          inputBillForm,
        }),
      });
    };

    const getAllBills = async () => {
      const ret = await Storage.get({ key: "bill" });
      const bill = JSON.parse(ret.value !== null ? ret.value : "");
      console.log(bill);
    };

    return {
      add,
      arrowBackCircle,
      arrowForwardCircle,
      arrowUpCircle,
      logoFacebook,
      logoInstagram,
      logoTwitter,
      logoVimeo,
      person,
      settings,
      share,
      stringDate,
      inputBillForm,
      chooseDate,
      saveBill,
      getAllBills,
    };
  },
});
</script>
