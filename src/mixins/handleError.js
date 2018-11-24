export default {
  methods: {
    handleError() {
      if (navigator.onLine === false) {
        this.state.offline = true;
        setTimeout(() => {
          this.state.offline = false;
        }, 2000);
      } else {
        this.state.postError = true;
        setTimeout(() => {
          this.state.postError = false;
        }, 2000);
      }
    }
  }
};
