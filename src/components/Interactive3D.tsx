
"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Interactive3D: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // Stars
        const starGeometry = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 1500;
            const y = (Math.random() - 0.5) * 1500;
            const z = (Math.random() - 0.5) * 1500;
            starVertices.push(x, y, z);
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.3,
            transparent: true,
            opacity: 0.5
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Galaxy
        const parameters = {
            count: 50000,
            size: 0.01,
            radius: 35,
            branches: 5,
            spin: 1.2,
            randomness: 0.6,
            randomnessPower: 3.5,
            insideColor: '#be29ec',
            outsideColor: '#7df9ff'
        };

        let galaxyGeometry: THREE.BufferGeometry | null = null;
        let galaxyMaterial: THREE.PointsMaterial | null = null;
        let galaxy: THREE.Points | null = null;
        
        const generateGalaxy = () => {
            if(galaxy !== null) {
                galaxyGeometry?.dispose();
                galaxyMaterial?.dispose();
                scene.remove(galaxy);
            }

            galaxyGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(parameters.count * 3);
            const colors = new Float32Array(parameters.count * 3);
            const colorInside = new THREE.Color(parameters.insideColor);
            const colorOutside = new THREE.Color(parameters.outsideColor);

            for(let i = 0; i < parameters.count; i++) {
                const i3 = i * 3;
                const radius = Math.random() * parameters.radius;
                const spinAngle = radius * parameters.spin;
                const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

                positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
                positions[i3 + 1] = randomY * 0.5;
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

                const mixedColor = colorInside.clone();
                mixedColor.lerp(colorOutside, radius / parameters.radius);
                colors[i3] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }

            galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            galaxyMaterial = new THREE.PointsMaterial({
                size: parameters.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
            scene.add(galaxy);
        };
        generateGalaxy();

        const mouse = new THREE.Vector2();

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let frameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            stars.rotation.y = -elapsedTime * 0.01;

            if(galaxy) {
                galaxy.rotation.y = elapsedTime * 0.05;
            }
            
            // Camera interaction
            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
            
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
            if(currentMount && renderer.domElement){
                currentMount.removeChild(renderer.domElement);
            }
            starGeometry.dispose();
            starMaterial.dispose();
            galaxyGeometry?.dispose();
            galaxyMaterial?.dispose();
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 z-0 bg-transparent" aria-hidden="true"/>;
};

export default Interactive3D;
