export class DomFunctions {
  static removeClassFromElement(elementId: string, cssClass: string) {
    let element = document.getElementById(elementId);
    if (element) element.classList.remove(cssClass);
  }

  static addClassToElement(elementId: string, cssClass: string) {
    let element = document.getElementById(elementId);
    if (element) element.classList.add(cssClass);
  }

  static addClassToElementForTime(
    elementId: string,
    cssClass: string,
    time: number,
  ) {
    this.addClassToElement(elementId, cssClass);

    setTimeout(() => {
      this.removeClassFromElement(elementId, cssClass);
    }, time);
  }
}
