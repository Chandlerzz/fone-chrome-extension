import { defineStore } from "pinia";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore("main", {
  // a function that returns a fresh state
  state: () => ({
    baseUrl: "",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    doubleCounter: (state) => state.counter * 2,
    // use getters in other getters
    doubleCounterPlusOne() {
      return this.doubleCounter + 1;
    },
  },
  // optional actions
  actions: {
    getDataFromLocalStorage() {
      let origin = location.origin;
      let webPage_origin = "";
      let f_userInfo = "";
      let f_lastSelectedApplication = "";
      let f_authorization = "";
      let f_sessionId = "";
      const storageKeys = [
        "origin",
        "f_lastSelectedApplication",
        "f_sessionId",
        "f_authorization",
        "f_userInfo",
      ];
      if (origin.startsWith("http://localhost")) {
        this.baseUrl = "http://10.10.9.27/";
        f_userInfo = JSON.parse(localStorage.getItem("f_userInfo"));
        f_userInfo = JSON.parse(f_userInfo.data);
        f_lastSelectedApplication = JSON.parse(
          localStorage.getItem("f_lastSelectedApplication"),
        );
        f_sessionId = JSON.parse(localStorage.getItem("f_sessionId"));
        f_authorization = JSON.parse(
          localStorage.getItem("f_authorization"),
        );

        this.headers["Ewaresoft-FOne-SessionId"] = f_sessionId
          ? f_sessionId.data
          : "";
        this.headers["Ewaresoft-FOne-GlobalUserId"] = f_userInfo.user_id;
        this.headers["Ewaresoft-FOne-ApplicationId"] =
          f_lastSelectedApplication._id;
        this.headers["Ewaresoft-FOne-ApplicationUserId"] =
          f_lastSelectedApplication.organization_id;
        this.headers["Authorization"] = f_authorization.data;
      } else {
        chrome.storage.sync.get(storageKeys, (result) => {
          origin = result.origin;
          f_userInfo = result.f_userInfo;
          f_lastSelectedApplication = result.f_lastSelectedApplication;
          f_authorization = result.f_authorization;
          f_sessionId = result.f_sessionId;
          if (origin) {
            if (origin.startsWith("https://fone.risen.com")) {
              this.baseUrl = "https://fone.risen.com:80/";
            } else {
              this.baseUrl = "http://10.10.9.27/";
            }
          }
          if (f_userInfo) {
            f_userInfo = JSON.parse(f_userInfo);
            f_userInfo = JSON.parse(f_userInfo.data);
            this.headers["Ewaresoft-FOne-GlobalUserId"] = f_userInfo.user_id;
          }
          if (f_lastSelectedApplication) {
            f_lastSelectedApplication = JSON.parse(
              f_lastSelectedApplication,
            );
            this.headers["Ewaresoft-FOne-ApplicationId"] =
              f_lastSelectedApplication._id;
            this.headers["Ewaresoft-FOne-ApplicationUserId"] =
              f_lastSelectedApplication.organization_id;
          }
          if (f_sessionId) {
            f_sessionId = JSON.parse(f_sessionId);
            this.headers["Ewaresoft-FOne-SessionId"] = f_sessionId
              ? f_sessionId.data
              : "";
          }
          if (f_authorization) {
            f_authorization = JSON.parse(f_authorization);
            this.headers["Authorization"] = f_authorization.data;
          }
        });
      }
    },
  },
});
