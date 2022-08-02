<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>歷程</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- 日曆 -->
      <!-- <ion-datetime
        v-if="!isDateTimeCollapse"
        presentation="date"
        size="cover"
        v-model="pickDate"
      ></ion-datetime> -->
      <v-date-picker
        v-if="!isDateTimeCollapse"
        is-expanded
        :attributes="attributes"
        v-model="pickDate"
      />
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
        <ion-title>{{ formattedDate }}</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="danger">
            新增一筆
            <ion-icon slot="end" :icon="create"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-list>
        <!-- Sliding item with icon start options on end side -->
        <ion-item-sliding v-for="m in recordListByDate" :key="m.id">
          <ion-item :color="isIncome(m.mainType) ? 'secondary' : ''">
            <ion-icon
              slot="start"
              :ios="
                isIncome(m.mainType) ? trendingUpOutline : trendingDownOutline
              "
              :md="
                isIncome(m.mainType) ? trendingUpOutline : trendingDownOutline
              "
            ></ion-icon>
            <ion-label>{{ m.describe }}</ion-label>
            <ion-note slot="end">{{ m.currency + " " + m.amount }}</ion-note>
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
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  computed,
} from "vue";
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
import { format, parseISO, isSameDay } from "date-fns";
import { createExpensesBills } from "@/components/mockBillsList";
import { EnumBillMainType, IBill } from "@/components/bill";
export default defineComponent({
  name: "CalendarPage",
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
    // IonDatetime,
    IonPage,
    IonContent,
    IonLabel,
    IonItem,
  },
  setup() {
    // 日曆功能
    // https://ionicframework.com/docs/api/datetime

    const pickDate = ref(new Date());
    const formattedDate = computed(() => {
      return format(pickDate.value, "yyyy-MM-dd");
    });
    const isDateTimeCollapse = ref(false);

    const collapseDateTime = () => {
      return (isDateTimeCollapse.value = !isDateTimeCollapse.value);
    };
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    // Attributes are supplied as an array
    const attributes = reactive([
      {
        key: "today",
        highlight: {
          color: "purple",
          fillMode: "outline",
        },
        dates: new Date(),
      },
      // 收入 藍(預設)
      // {
      //   dot: true,
      //   dates: [
      //     new Date(2022, 6, 1),
      //     new Date(2022, 6, 10),
      //     new Date(2022, 6, 22),
      //   ],
      // },
      // 支出 紅
      // {
      //   dot: "red",
      //   dates: [
      //     new Date(2022, 6, 4),
      //     new Date(2022, 6, 10),
      //     new Date(2022, 6, 15),
      //     new Date(2022, 6, 22),
      //   ],
      // },
    ]) as any;

    // 記帳紀錄功能
    console.log("記帳紀錄功能");
    const mockRecordList = createExpensesBills(15);
    console.log(mockRecordList);

    const putRecordIntoCalendar = () => {
      const incomeDays = [] as any;
      const expensesDays = [] as any;
      mockRecordList.forEach((bill, i) => {
        if (EnumBillMainType.income === bill.mainType) {
          incomeDays.push(bill.date);
        } else if (EnumBillMainType.expenses === bill.mainType) {
          expensesDays.push(bill.date);
        }
      });
      if (incomeDays.length > 0) {
        attributes.push({ dot: true, dates: incomeDays });
      }
      if (expensesDays.length > 0) {
        attributes.push({ dot: "red", dates: expensesDays });
      }
    };

    onMounted(() => {
      putRecordIntoCalendar();
    });

    const isIncome = (mainType: string) => {
      return mainType === EnumBillMainType.income;
    };

    const recordListByDate = computed(() => {
      console.log("recordListByDate - ", pickDate.value);
      console.log(
        mockRecordList.filter((bill) => isSameDay(bill.date, pickDate.value))
      );
      return mockRecordList.filter((bill) =>
        isSameDay(bill.date, pickDate.value)
      );
    });

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
      formattedDate,
      isDateTimeCollapse,
      collapseDateTime,
      mockRecordList,
      EnumBillMainType,
      isIncome,
      attributes,
      recordListByDate,
    };
  },
});
</script>

