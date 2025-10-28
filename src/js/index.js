import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// 1. scene : 화면에서 보여주려는 객체를 담은 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe187);
// 2. camera : scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

// 3. renderer: scene +. camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x4d7dff });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

function animate() {
  box.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  // 1. 카메라의 종횡비
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //카메라 업데이트

  // 2.렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 8. GSAP ScrollTrigger로 스크롤 시 큐브 회전
gsap.to(box.rotation, {
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 1, // 스크롤과 회전이 동기화
  },
  y: Math.PI * 6, // 3바퀴 회전
  x: Math.PI * 2,
  ease: "none",
});
