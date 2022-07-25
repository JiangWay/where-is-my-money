<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Header</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- 日曆 -->
      <ion-datetime
        v-if="!isDateTimeCollapse"
        presentation="date"
        size="cover"
        v-model="pickDate"
      ></ion-datetime>

      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="collapseDateTime">
            <ion-icon
              slot="start"
              :icon="isDateTimeCollapse ? arrowDown : arrowUp"
            ></ion-icon>
            {{ isDateTimeCollapse ? "打開" : "折疊" }}
          </ion-button>
        </ion-buttons>
        <ion-title>{{ formattedString }}</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="danger">
            新增一筆
            <ion-icon slot="end" :icon="create"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-list>
          <!-- Sliding item with icon start options on end side -->
          <ion-item-sliding v-for="m in mockRecordList" :key="m.id">
              <ion-item
                :color="
                  isIncome(m.mainType) ? 'secondary' : ''
                "
              >
                <ion-icon
                  slot="start"
                  :ios="isIncome(m.mainType) ? trendingUpOutline : trendingDownOutline"
                  :md="isIncome(m.mainType) ? trendingUpOutline : trendingDownOutline"
                ></ion-icon>
                <ion-label>{{ m.describe }}</ion-label>
                <ion-note slot="end">{{
                  m.currency + " " + m.amount
                }}</ion-note>
              </ion-item>
              <ion-item-options>
                <ion-item-option color="primary">
                  <ion-icon
                    slot="start"
                    :ios="ellipsisHorizontal"
                    :md="ellipsisVertical"
                  ></ion-icon>
                  編輯
                </ion-item-option>
                <ion-item-option color="secondary">
                  <ion-icon slot="start" :icon="trash"></ion-icon>
                  刪除
                </ion-item-option>
              </ion-item-options>
          </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import {
  IonNote,
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonDatetime,
  IonPage,
  IonContent,
  IonLabel,
  IonItem,

} from "@ionic/vue";
import {
  archive,
  ellipsisHorizontal,
  ellipsisVertical,
  heart,
  star,
  trash,
  create,
  arrowUp,
  arrowDown,
  trendingUpOutline,
  trendingDownOutline,
} from "ionicons/icons";
import { format, parseISO } from "date-fns";
import { createExpensesBills } from "@/components/mockBillsList";
import { EnumBillMainType } from "@/components/bill";
export default defineComponent({
  name: "Tab1Page",
  components: {

    IonNote,
    IonButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonList,
    IonDatetime,
    IonPage,
    IonContent,
    IonLabel,
    IonItem,
  },
  setup() {
    // 日曆功能
    // https://ionicframework.com/docs/api/datetime

    const pickDate = ref();
    const formattedString = ref();
    const isDateTimeCollapse = ref(false);
    watch(
      pickDate,
      (nV, oV) => {
        console.log(nV, oV);
        console.log(nV);
        if (nV) {
          // const dateFromIonDatetime = '2021-06-04T14:23:00-04:00';
          formattedString.value = format(parseISO(nV), "yyyy-MM-dd");
          console.log(formattedString);
        }
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      const datetime = document.querySelector("ion-datetime");
      console.log(datetime);
      if (datetime) {
        // datetime.dayValues = [1, 3, 5, 7];
      }
    });

    const collapseDateTime = () => {
      return (isDateTimeCollapse.value = !isDateTimeCollapse.value);
    };

    // 記帳紀錄功能
    console.log("記帳紀錄功能");
    const mockRecordList = createExpensesBills(15);
    console.log(mockRecordList);

    const isIncome = (mainType:string)=> { return  mainType === EnumBillMainType.income}


    return {
      pickDate,
      archive,
      ellipsisHorizontal,
      ellipsisVertical,
      heart,
      star,
      trash,
      create,
      arrowUp,
      arrowDown,
      trendingUpOutline,
      trendingDownOutline,
      formattedString,
      isDateTimeCollapse,
      collapseDateTime,
      mockRecordList,
      EnumBillMainType,
      isIncome
    };
  },
});
</script>
