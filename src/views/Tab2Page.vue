<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Header</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- fab placed to the top end -->
      <ion-fab vertical="top" horizontal="start" slot="fixed">
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
      </ion-fab>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import {
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
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
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
    };
  },
});
</script>
