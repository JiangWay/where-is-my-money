<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/calendar">
          <ion-icon :icon="calendarOutline" />
          <ion-label>歷程</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/addBill">
          <ion-icon :icon="addCircleOutline" />
          <ion-label>紀錄</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/chart">
          <ion-icon :icon="barChartOutline" />
          <ion-label>圖表</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/setting">
          <ion-icon :icon="personOutline" />
          <ion-label>設定</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  calendarOutline,
  addCircleOutline,
  personOutline,
  barChartOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      calendarOutline,
      addCircleOutline,
      personOutline,
      barChartOutline,
    };
  },
});
</script>
