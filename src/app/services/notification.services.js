class Notification {
  hasLoader() {
    return "loader";
  }
  hasError() {
    return "error";
  }
  hasInfo() {
    return "info";
  }
}

const { hasLoader, hasError, hasInfo } = new Notification();
export { hasLoader, hasError, hasInfo };
