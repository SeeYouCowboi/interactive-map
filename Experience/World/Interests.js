import * as THREE from "three";
import Experience from "../Experience.js";
import { EventEmitter } from "events";
import gsap from "gsap";

export default class Interests {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.controls = this.experience.controls;
    this.debug = this.experience.debug;
    this.device = this.sizes.device;
    this.scrolling = this.experience.scrolling;
    this.originTarget = this.controls.controls.target;
    this.DEFAULT_FOCUS = -1;
    this.focusing = this.DEFAULT_FOCUS;

    console.log(this.camera.orthographicCamera);
    //debug
    this.flag = 0;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
      console.log(device);
    });

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("interest1");
    }

    this.obj = {
      x: 4,
      y: 1.2,
      z: 0.5,
    };

    // Setup
    this.points = [];
    this.smallPoints = [];
    this.raycaster = new THREE.Raycaster();
    this.setInterests();
    this.showInfos();
  }

  setInterests() {
    var iconHeight = 3.339;
    this.points = [
      {
        position: new THREE.Vector3(-5.15, iconHeight, 3.036),
        element: document.querySelector(".mcba"),
      },
      {
        position: new THREE.Vector3(4.725, iconHeight, 3.06),
        element: document.querySelector(".mudac"),
      },
      {
        position: new THREE.Vector3(0.076, iconHeight, 7.277),
        element: document.querySelector(".elysee"),
      },
    ];

    // Set small points
    this.smallPoints = [
      [
        {
          position: new THREE.Vector3(-5.453, 1.877, 4.343),
          element: document.querySelector(".pharmacy-computer"),
        },
        {
          position: new THREE.Vector3(-5.066, 1.877, 1.615),
          element: document.querySelector(".pharmacy-shelf"),
        },
      ],
      [
        {
          position: new THREE.Vector3(3.876, 1.623, 3.523),
          element: document.querySelector(".vex-toolkit"),
        },
        {
          position: new THREE.Vector3(5.225, 2.243, 2.798),
          element: document.querySelector(".vex-computer"),
        },
      ],
      [
        {
          position: new THREE.Vector3(-0.005, 1.193, 7.725),
          element: document.querySelector(".front-desk"),
        },
        {
          position: new THREE.Vector3(-1.044, 1.662, 8.101),
          element: document.querySelector(".front-computer"),
        },
      ],
    ];

    // set visibility
    for (const point of this.points) point.element.classList.add("visible");

    for (const smallpoints of this.smallPoints)
      for (const point of smallpoints) point.element.classList.add("visible");

    console.log(this.smallPoints);
    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.points[2].position, "x")
        .name("x2")
        .min(-10)
        .max(10)
        .step(0.01);

      this.debugFolder
        .add(this.points[2].position, "y")
        .name("y2")
        .min(-10)
        .max(10)
        .step(0.01);

      this.debugFolder
        .add(this.points[2].position, "z")
        .name("z2")
        .min(-10)
        .max(10)
        .step(0.01);

      this.debugFolder
        .add(this.points[1].position, "x")
        .name("x1")
        .min(-10)
        .max(10)
        .step(0.01);

      this.debugFolder
        .add(this.points[1].position, "y")
        .name("y1")
        .min(-10)
        .max(10)
        .step(0.01);

      this.debugFolder
        .add(this.points[1].position, "z")
        .name("z1")
        .min(-10)
        .max(10)
        .step(0.01);
    }
  }

  showInfos() {
    const mcba = document.querySelector(".mcba");
    const mudac = document.querySelector(".mudac");
    const elysee = document.querySelector(".elysee");
    const arcadia = document.querySelector(".arcadia");
    const nabi = document.querySelector(".nabi");
    const lumen = document.querySelector(".lumen");

    const pharmacyShelf = document.querySelector(".pharmacy-shelf");
    const pharmacyComputer = document.querySelector(".pharmacy-computer");
    const vexToolkit = document.querySelector(".vex-toolkit");
    const vexComputer = document.querySelector(".vex-computer");
    const frontDesk = document.querySelector(".front-desk");
    const frontComputer = document.querySelector(".front-computer");

    const closeIcn = document.querySelector(".close");

    const infoPanel = document.querySelector(".info-panel");
    const infoPanelImage = document.querySelector(".info-panel-image");
    const infoPanelLogo = document.querySelector(".info-panel-logo");
    const infoPanelTitle = document.querySelector(".info-panel-title");
    // const infoPanelLead = document.querySelector(".info-panel-lead");
    const infoPanelDescription = document.querySelector(
      ".info-panel-description",
    );

    const infoPanelPhone = document.querySelector(".info-panel-phone");
    const infoPanelEmail = document.querySelector(".info-panel-email");
    // const infoPanelWebsite = document.querySelector(".info-panel-website");
    let infoPanelRightStyle = "0";

    // 点开小部件后显示消息的数组
    // index与部件对应：
    // 0 -- frontComputer
    // 1 -- frontDesk
    // 2 -- vexComputer
    // 3 -- vexToolkit
    // 4 -- pharmacyComputer
    // 5 -- pharmacyShelf
    const infos = [
      {
        image: "/images/img-mcba.jpg",
        logo: "/images/logo-mcba.svg",
        title: "Musée Cantonal des Beaux-Arts Lausanne",
        lead: "Opened in 1841, the Vaud Museum of Fine Arts in Lausanne is one of the oldest Swiss museums exclusively dedicated to art. Now located in Plateforme 10, it presents several temporary exhibitions a year from its collection of 10,000 works.",
        description: `Ducros, Gleyre, Steinlen, Vallotton and Soutter: these are some of the Vaudois painters for which the Vaud Museum of Fine Arts (MCBA) is known, nationally and internationally. Their works form a large part of the museum’s collection, currently comprising some 10,000 paintings. <br><br>
        The MCBA organises several temporary exhibitions every year, each one accompanied with a programme of cultural activities including events, guided tours and workshops for adults and children. Admission is free on the first Saturday of the month.`,
        schedule: [
          "Closed",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 20:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
        ],
        contact: ["+41 21 316 34 45", "mcba@plateforme10.ch"],
        website: "https://www.mcba.ch/en/",
      },
      {
        image: "/images/img-mcba.jpg",
        logo: "/images/logo-mcba.svg",
        title: "Musée Cantonal des Beaux-Arts Lausanne",
        lead: "Opened in 1841, the Vaud Museum of Fine Arts in Lausanne is one of the oldest Swiss museums exclusively dedicated to art. Now located in Plateforme 10, it presents several temporary exhibitions a year from its collection of 10,000 works.",
        description: `Ducros, Gleyre, Steinlen, Vallotton and Soutter: these are some of the Vaudois painters for which the Vaud Museum of Fine Arts (MCBA) is known, nationally and internationally. Their works form a large part of the museum’s collection, currently comprising some 10,000 paintings. <br><br>
        The MCBA organises several temporary exhibitions every year, each one accompanied with a programme of cultural activities including events, guided tours and workshops for adults and children. Admission is free on the first Saturday of the month.`,
        schedule: [
          "Closed",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 20:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
        ],
        contact: ["+41 21 316 34 45", "mcba@plateforme10.ch"],
        website: "https://www.mcba.ch/en/",
      },
      {
        image: "/images/img-mcba.jpg",
        logo: "/images/logo-mcba.svg",
        title: "Musée Cantonal des Beaux-Arts Lausanne",
        lead: "Opened in 1841, the Vaud Museum of Fine Arts in Lausanne is one of the oldest Swiss museums exclusively dedicated to art. Now located in Plateforme 10, it presents several temporary exhibitions a year from its collection of 10,000 works.",
        description: `Ducros, Gleyre, Steinlen, Vallotton and Soutter: these are some of the Vaudois painters for which the Vaud Museum of Fine Arts (MCBA) is known, nationally and internationally. Their works form a large part of the museum’s collection, currently comprising some 10,000 paintings. <br><br>
        The MCBA organises several temporary exhibitions every year, each one accompanied with a programme of cultural activities including events, guided tours and workshops for adults and children. Admission is free on the first Saturday of the month.`,
        schedule: [
          "Closed",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 20:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
        ],
        contact: ["+41 21 316 34 45", "mcba@plateforme10.ch"],
        website: "https://www.mcba.ch/en/",
      },
      {
        image: "/images/img-mcba.jpg",
        logo: "/images/logo-mcba.svg",
        title: "Musée Cantonal des Beaux-Arts Lausanne",
        lead: "Opened in 1841, the Vaud Museum of Fine Arts in Lausanne is one of the oldest Swiss museums exclusively dedicated to art. Now located in Plateforme 10, it presents several temporary exhibitions a year from its collection of 10,000 works.",
        description: `Ducros, Gleyre, Steinlen, Vallotton and Soutter: these are some of the Vaudois painters for which the Vaud Museum of Fine Arts (MCBA) is known, nationally and internationally. Their works form a large part of the museum’s collection, currently comprising some 10,000 paintings. <br><br>
        The MCBA organises several temporary exhibitions every year, each one accompanied with a programme of cultural activities including events, guided tours and workshops for adults and children. Admission is free on the first Saturday of the month.`,
        schedule: [
          "Closed",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 20:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
        ],
        contact: ["+41 21 316 34 45", "mcba@plateforme10.ch"],
        website: "https://www.mcba.ch/en/",
      },
      {
        image: "/images/img-mcba.jpg",
        logo: "/images/logo-mcba.svg",
        title: "Musée Cantonal des Beaux-Arts Lausanne",
        lead: "Opened in 1841, the Vaud Museum of Fine Arts in Lausanne is one of the oldest Swiss museums exclusively dedicated to art. Now located in Plateforme 10, it presents several temporary exhibitions a year from its collection of 10,000 works.",
        description: `Ducros, Gleyre, Steinlen, Vallotton and Soutter: these are some of the Vaudois painters for which the Vaud Museum of Fine Arts (MCBA) is known, nationally and internationally. Their works form a large part of the museum’s collection, currently comprising some 10,000 paintings. <br><br>
        The MCBA organises several temporary exhibitions every year, each one accompanied with a programme of cultural activities including events, guided tours and workshops for adults and children. Admission is free on the first Saturday of the month.`,
        schedule: [
          "Closed",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 20:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
        ],
        contact: ["+41 21 316 34 45", "mcba@plateforme10.ch"],
        website: "https://www.mcba.ch/en/",
      },
      {
        image: "/images/img-mcba.jpg",
        logo: "/images/logo-mcba.svg",
        title: "Musée Cantonal des Beaux-Arts Lausanne",
        lead: "Opened in 1841, the Vaud Museum of Fine Arts in Lausanne is one of the oldest Swiss museums exclusively dedicated to art. Now located in Plateforme 10, it presents several temporary exhibitions a year from its collection of 10,000 works.",
        description: `Ducros, Gleyre, Steinlen, Vallotton and Soutter: these are some of the Vaudois painters for which the Vaud Museum of Fine Arts (MCBA) is known, nationally and internationally. Their works form a large part of the museum’s collection, currently comprising some 10,000 paintings. <br><br>
        The MCBA organises several temporary exhibitions every year, each one accompanied with a programme of cultural activities including events, guided tours and workshops for adults and children. Admission is free on the first Saturday of the month.`,
        schedule: [
          "Closed",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 20:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
          "10:00 - 18:00",
        ],
        contact: ["+41 21 316 34 45", "mcba@plateforme10.ch"],
        website: "https://www.mcba.ch/en/",
      },
    ];

    if (this.device === "desktop") {
      infoPanelRightStyle = "-33%";
    } else {
      infoPanelRightStyle = "-100%";
    }

    document.addEventListener("keydown", (event) => {
      if (
        this.focusing != this.DEFAULT_FOCUS &&
        (event.key === "Escape" || event.key === "Esc")
      ) {
        this.focusing = this.DEFAULT_FOCUS;
        const tl = gsap.timeline();
        this.controls.controls.target = new THREE.Vector3(0, 0, 0);
        gsap.to(this.camera.orthographicCamera.rotation, {
          _x: -0.5404,
          _y: 0.7088,
          _z: 0.3723,
          duration: 2,
          ease: "power1.inout",
          onUpdate: () => {
            this.camera.orthographicCamera.updateProjectionMatrix();
          },
        });
        tl.to(this.camera.orthographicCamera.position, {
          x: 1,
          y: 0.6,
          z: 1,
          duration: 1,
          ease: "power1.inout",
          onUpdate: () => {
            this.camera.orthographicCamera.updateProjectionMatrix();
          },
        }).to(this.camera.orthographicCamera, {
          zoom: 0.8,
          duration: 0.5,
          ease: "power1.inout",
          onUpdate: () => {
            this.camera.orthographicCamera.updateProjectionMatrix();
          },
        });
      }

      // if (event.key == "c") {
      //   console.log(this.camera.orthographicCamera);
      // }
    });

    mcba.addEventListener("click", () => {
      this.focusing = 0;
      const tl = gsap.timeline();
      this.controls.controls.target = new THREE.Vector3(
        this.points[0].position.x,
        this.points[0].position.y - 0.5,
        this.points[0].position.z - 1,
      );
      gsap.to(this.camera.orthographicCamera.rotation, {
        _x: -1.792040425367558,
        _y: 0.43438878671526926,
        _z: 2.0616218695302253,
        duration: 2,
        ease: "power1.inout",
      });
      tl.to(this.camera.orthographicCamera.position, {
        x: -2.8314466776113503,
        y: 9.661652246614242,
        z: 0.994380750106419,
        duration: 1,
        ease: "power1.inout",
      }).to(this.camera.orthographicCamera, {
        zoom: 3,
        duration: 0.5,
        ease: "power1.inout",
        onUpdate: () => {
          this.camera.orthographicCamera.updateProjectionMatrix();
        },
      });

      // console.log("this.camera", this.camera.orthographicCamera);
    });

    mudac.addEventListener("click", () => {
      this.focusing = 1;
      const tl = gsap.timeline();
      // console.log("this.camera", this.camera.orthographicCamera);
      this.controls.controls.target = new THREE.Vector3(
        this.points[1].position.x,
        this.points[1].position.y - 0.5,
        this.points[1].position.z - 1,
      );
      gsap.to(this.camera.orthographicCamera.rotation, {
        _x: -1.7270788306478189,
        _y: -0.829023335486163,
        _z: -1.7813456960640521,
        duration: 2,
        ease: "power1.inout",
        onUpdate: () => {
          this.camera.orthographicCamera.updateProjectionMatrix();
        },
      });
      tl.to(this.camera.orthographicCamera.position, {
        x: 3.782468361700867,
        y: 11.67969895224704,
        z: -3.01323285259171,
        duration: 1,
        ease: "power1.inout",
      }).to(this.camera.orthographicCamera, {
        zoom: 3,
        duration: 0.5,
        ease: "power1.inout",
        onUpdate: () => {
          this.camera.orthographicCamera.updateProjectionMatrix();
        },
      });

      console.log("this.camera", this.camera.orthographicCamera);
    });

    elysee.addEventListener("click", () => {
      this.focusing = 2;
      const tl = gsap.timeline();
      this.controls.controls.target = new THREE.Vector3(
        this.points[2].position.x,
        this.points[2].position.y - 0.5,
        this.points[2].position.z - 1,
      );
      gsap.to(this.camera.orthographicCamera.rotation, {
        _x: -1.792040425367558,
        _y: 0.43438878671526926,
        _z: 2.0616218695302253,
        duration: 2,
        ease: "power1.inout",
      });
      tl.to(this.camera.orthographicCamera.position, {
        x: -2.8314466776113503,
        y: 9.661652246614242,
        z: 0.994380750106419,
        duration: 1,
        ease: "power1.inout",
      }).to(this.camera.orthographicCamera, {
        zoom: 3,
        duration: 0.5,
        ease: "power1.inout",
        onUpdate: () => {
          this.camera.orthographicCamera.updateProjectionMatrix();
        },
      });
    });

    frontComputer.addEventListener("click", () => {
      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      const infoIndex = 0;
      infoPanelImage.src = infos[infoIndex].image;
      infoPanelTitle.innerHTML = infos[infoIndex].title;
      infoPanelDescription.innerHTML = infos[infoIndex].description;
      infoPanelPhone.innerHTML = infos[infoIndex].contact[0];
      infoPanelEmail.innerHTML = infos[infoIndex].contact[1];
    });

    frontDesk.addEventListener("click", () => {
      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      const infoIndex = 1;
      infoPanelImage.src = infos[infoIndex].image;
      infoPanelTitle.innerHTML = infos[infoIndex].title;
      infoPanelDescription.innerHTML = infos[infoIndex].description;
      infoPanelPhone.innerHTML = infos[infoIndex].contact[0];
      infoPanelEmail.innerHTML = infos[infoIndex].contact[1];
    });

    vexComputer.addEventListener("click", () => {
      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      const infoIndex = 2;
      infoPanelImage.src = infos[infoIndex].image;
      infoPanelTitle.innerHTML = infos[infoIndex].title;
      infoPanelDescription.innerHTML = infos[infoIndex].description;
      infoPanelPhone.innerHTML = infos[infoIndex].contact[0];
      infoPanelEmail.innerHTML = infos[infoIndex].contact[1];
    });

    vexToolkit.addEventListener("click", () => {
      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      const infoIndex = 3;
      infoPanelImage.src = infos[infoIndex].image;
      infoPanelTitle.innerHTML = infos[infoIndex].title;
      infoPanelDescription.innerHTML = infos[infoIndex].description;
      infoPanelPhone.innerHTML = infos[infoIndex].contact[0];
      infoPanelEmail.innerHTML = infos[infoIndex].contact[1];
    });

    pharmacyComputer.addEventListener("click", () => {
      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      const infoIndex = 4;
      infoPanelImage.src = infos[infoIndex].image;
      infoPanelTitle.innerHTML = infos[infoIndex].title;
      infoPanelDescription.innerHTML = infos[infoIndex].description;
      infoPanelPhone.innerHTML = infos[infoIndex].contact[0];
      infoPanelEmail.innerHTML = infos[infoIndex].contact[1];
    });

    pharmacyShelf.addEventListener("click", () => {
      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      const infoIndex = 5;
      infoPanelImage.src = infos[infoIndex].image;
      infoPanelTitle.innerHTML = infos[infoIndex].title;
      infoPanelDescription.innerHTML = infos[infoIndex].description;
      infoPanelPhone.innerHTML = infos[infoIndex].contact[0];
      infoPanelEmail.innerHTML = infos[infoIndex].contact[1];
    });

    lumen.addEventListener("click", () => {
      this.scrolling.target = 0;
      infoPanel.style.right = "0";
      infoPanelImage.src = infos[5].image;
      infoPanelLogo.src = infos[5].logo;
      infoPanelTitle.innerHTML = infos[5].title;
      infoPanelLead.innerHTML = infos[5].lead;
      infoPanelDescription.innerHTML = infos[5].description;
      infoPanelMo.innerHTML = infos[5].schedule[0];
      infoPanelTu.innerHTML = infos[5].schedule[1];
      infoPanelWe.innerHTML = infos[5].schedule[2];
      infoPanelTh.innerHTML = infos[5].schedule[3];
      infoPanelFr.innerHTML = infos[5].schedule[4];
      infoPanelSa.innerHTML = infos[5].schedule[5];
      infoPanelSu.innerHTML = infos[5].schedule[6];
      infoPanelPhone.innerHTML = infos[5].contact[0];
      infoPanelEmail.innerHTML = infos[5].contact[1];
      infoPanelWebsite.href = infos[5].website;
    });

    closeIcn.addEventListener("click", () => {
      infoPanel.style.right = infoPanelRightStyle;
    });
  }

  resize() {}

  update() {
    if (this.focusing == this.DEFAULT_FOCUS) {
      for (const point of this.points) {
        const screenPosition = point.position.clone();
        screenPosition.project(this.camera.orthographicCamera);

        point.element.classList.remove("hidden");

        this.raycaster.setFromCamera(
          screenPosition,
          this.camera.orthographicCamera,
        );

        const translateX = screenPosition.x * this.sizes.width * 0.5;
        const translateY = -screenPosition.y * this.sizes.height * 0.5;
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
      }
      for (let smallpoints of this.smallPoints)
        for (let point of smallpoints) {
          point.element.classList.add("hidden");
        }
    } else {
      var currentRow = 0;
      for (const smallpoints of this.smallPoints) {
        for (const point of smallpoints) {
          const screenPosition = point.position.clone();
          screenPosition.project(this.camera.orthographicCamera);

          if (currentRow == this.focusing) {
            point.element.classList.remove("hidden");
          } else point.element.classList.add("hidden");

          this.raycaster.setFromCamera(
            screenPosition,
            this.camera.orthographicCamera,
          );

          const translateX = screenPosition.x * this.sizes.width * 0.5;
          const translateY = -screenPosition.y * this.sizes.height * 0.5;
          point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
        }
        currentRow++;
      }

      for (const point of this.points) {
        point.element.classList.add("hidden");
      }
    }
  }
}
