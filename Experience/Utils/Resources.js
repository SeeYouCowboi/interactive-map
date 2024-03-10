import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EventEmitter } from "events";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    // 获取HTML中表示加载进度的元素引用
    this.loadingProgress = document.querySelector(".loading-progress");

    this.setLoadingManager();
    this.setLoaders();
    this.startLoading();
  }

  setLoadingManager() {
    this.loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {},
      // Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        this.progressRatio = (itemsLoaded / itemsTotal) * 100;
        this.loadingProgress.innerHTML = Math.round(this.progressRatio);
      },
    );
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    this.loaders.dracoLoader = new DRACOLoader(this.loadingManager);
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    console.log("start loading assets");
    for (const asset of this.assets) {
      if (asset.type === "texture") {
        this.loaders.textureLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
          console.log("loaded " + asset.name);
        });
      } else if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
          console.log("loaded " + asset.name);
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      console.log("assets loaded");
      this.emit("ready");
    }
  }
}
