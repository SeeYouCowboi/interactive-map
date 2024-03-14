import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience.js";

export default class Bike {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.hosModel = this.resources.items.hosModel;
    this.actualHosModel = this.hosModel.scene;
    this.hosChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("plateforme10");
      this.obj = {
        colorObj: { r: 0, g: 0, b: 0 },
      };
    }

    this.setPlateforme10Model();
  }

  setPlateforme10Model() {
    const textureHos = this.resources.items.textureHos;
    textureHos.flipY = false;
    textureHos.encoding = THREE.sRGBEncoding;
    const materialHos = new THREE.MeshBasicMaterial({
      map: textureHos,
    });

    const textureRoadLights = this.resources.items.textureRoadLights;
    textureRoadLights.flipY = false;
    textureRoadLights.encoding = THREE.sRGBEncoding;
    const materialRoadLights = new THREE.MeshBasicMaterial({
      map: textureRoadLights,
    });

    const textureTable = this.resources.items.textureTable;
    textureTable.flipY = false;
    textureTable.encoding = THREE.sRGBEncoding;
    const materialTable = new THREE.MeshBasicMaterial({
      map: textureTable,
    });

    const textureChairs = this.resources.items.textureChairs;
    textureChairs.flipY = false;
    textureChairs.encoding = THREE.sRGBEncoding;
    const materialChairs = new THREE.MeshBasicMaterial({
      map: textureChairs,
    });

    const textureComputers = this.resources.items.textureComputers;
    textureComputers.flipY = false;
    textureComputers.encoding = THREE.sRGBEncoding;
    const materialComputers = new THREE.MeshBasicMaterial({
      map: textureComputers,
    });

    const textureShabbyDesk = this.resources.items.textureShabbyDesk;
    textureShabbyDesk.flipY = false;
    textureShabbyDesk.encoding = THREE.sRGBEncoding;
    const materialShabbyDesk = new THREE.MeshBasicMaterial({
      map: textureShabbyDesk,
    });

    const textureShelf = this.resources.items.textureShelf;
    textureShelf.flipY = false;
    textureShelf.encoding = THREE.sRGBEncoding;
    const materialShelf = new THREE.MeshBasicMaterial({
      map: textureShelf,
    });

    const textureToolsChest = this.resources.items.textureToolsChest;
    textureToolsChest.flipY = false;
    textureToolsChest.encoding = THREE.sRGBEncoding;
    const materialToolsChest = new THREE.MeshBasicMaterial({
      map: textureToolsChest,
    });

    const textureVetDesk = this.resources.items.textureVetDesk;
    textureVetDesk.flipY = false;
    textureVetDesk.encoding = THREE.sRGBEncoding;
    const materialVetDesk = new THREE.MeshBasicMaterial({
      map: textureVetDesk,
    });
    // const lightPanelTexture = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

    this.actualHosModel.traverse((child) => {
      if (child.name.match(/^hos.*$/)) {
        child.material = materialHos;
      }

      if (child.name.match(/^roadLights.*$/)) {
        child.material = materialRoadLights;
      }
      if (child.name.match(/^consult.*$/)) {
        child.material = materialTable;
      }

      if (child.name.match(/^chairs.*$/)) {
        child.material = materialChairs;
      }

      if (child.name.match(/^computers.*$/)) {
        child.material = materialComputers;
      }

      if (child.name.match(/^shabbyDesk.*$/)) {
        child.material = materialShabbyDesk;
      }

      if (child.name.match(/^shelf.*$/)) {
        child.material = materialShelf;
      }

      if (child.name.match(/^toolsChest.*$/)) {
        child.material = materialToolsChest;
      }

      if (child.name.match(/^vetDesk.*$/)) {
        child.material = materialVetDesk;
      }
    });

    this.scene.add(this.actualHosModel);
  }

  resize() {}

  update() {}
}
