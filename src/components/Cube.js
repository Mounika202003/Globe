import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Cube = () => {
  const mountRef = useRef(null);
  const spinningRef = useRef(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const materialArray = [
      new THREE.MeshStandardMaterial({
        color: "#e1e6ed",
        transparent: true,
        opacity: 0.3,
        roughness: 0.5,
        metalness: 0.1,
      }),
      new THREE.MeshStandardMaterial({
        color: "#e1e6ed",
        transparent: true,
        opacity: 0.3,
        roughness: 0.5,
        metalness: 0.1,
      }),
      new THREE.MeshStandardMaterial({
        color: "#e1e6ed",
        transparent: true,
        opacity: 0.3,
        roughness: 0.5,
        metalness: 0.1,
      }),
      new THREE.MeshStandardMaterial({
        color: "#e1e6ed",
        transparent: true,
        opacity: 0.3,
        roughness: 0.5,
        metalness: 0.1,
      }),
      new THREE.MeshStandardMaterial({
        color: "#e1e6ed",
        transparent: true,
        opacity: 0.3,
        roughness: 0.5,
        metalness: 0.1,
      }),
      new THREE.MeshStandardMaterial({
        color: "#e1e6ed",
        transparent: true,
        opacity: 0.3,
        roughness: 0.5,
        metalness: 0.1,
      }),
    ];

    const cube = new THREE.Mesh(geometry, materialArray);
    scene.add(cube);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    );

    const sphereGeometry = new THREE.SphereGeometry(2, 100, 100);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      color: "#ffffff",
      roughness: 100,
      metalness: 0,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    globe.position.set(0, 0, 0);

    camera.position.z = 7;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onDocumentMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(globe);

      if (intersects.length > 0) {
        globe.rotation.x += 0.05;
        globe.rotation.y += 0.05;
      }

      cube.rotation.x = mouse.y * Math.PI;
      cube.rotation.y = mouse.x * Math.PI;
    };

    const onDocumentTouchStart = () => {
      spinningRef.current = true;
    };

    const onDocumentTouchEnd = () => {
      spinningRef.current = false;
    };

    const animate = function () {
      requestAnimationFrame(animate);
      if (spinningRef.current) {
        globe.rotation.x += 0.05;
        globe.rotation.y += 0.05;
      }
      renderer.render(scene, camera);
    };

    document.addEventListener("mousemove", onDocumentMouseMove);
    document.addEventListener("mousedown", onDocumentTouchStart);
    document.addEventListener("mouseup", onDocumentTouchEnd);
    document.addEventListener("touchstart", onDocumentTouchStart);
    document.addEventListener("touchend", onDocumentTouchEnd);

    animate();

    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("mousedown", onDocumentTouchStart);
      document.removeEventListener("mouseup", onDocumentTouchEnd);
      document.removeEventListener("touchstart", onDocumentTouchStart);
      document.removeEventListener("touchend", onDocumentTouchEnd);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "90vh",
        background: "#212121",
        overflow: "hidden",
      }}
    />
  );
};

export default Cube;
