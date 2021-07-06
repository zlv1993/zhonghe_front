import * as THREE from 'three';

let textLoader= new THREE.TextureLoader();
let pipleMaterial= textLoader.load('/img/wushui.png')
pipleMaterial.wrapS=THREE.RepeatWrapping
pipleMaterial.wrapT=THREE.RepeatWrapping
pipleMaterial.repeat.x = 10;


// 创建通用水管
const createPipeline=(scene,CurvePath)=>{
  let geometry = new THREE.TubeGeometry(CurvePath, 100, 2, 25, false);
  let materail=new THREE.MeshLambertMaterial({
    map:pipleMaterial,
    transparent:true
  })
  let mesh=new THREE.Mesh(geometry,materail);
  scene.add(mesh);
 let tubeGeometry = new THREE.TubeGeometry(CurvePath, 100, 4, 25, false);

  let tubeMaterial = new THREE.MeshPhongMaterial({

      color: 0xffffff,

      transparent: true,

      opacity: 0.6,

  });

  let tube2 = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tube2);
}
//创建1水流
const createLine1=(scene)=>{
  // 创建多段线条的顶点数据
  let p1=new THREE.Vector3(-302, 5,-438)
  let p2=new THREE.Vector3(-302, 5,-658)

  let p3=new THREE.Vector3(-301, 5,-659)

  let p4=new THREE.Vector3(-300, 5,-660)
  let p5=new THREE.Vector3(290, 5, -660)
  let p6= new THREE.Vector3(292, 7, -660)
  let p7= new THREE.Vector3(295, 8, -660)
  let p8=new THREE.Vector3(295, 145,-660)
  let p9=new THREE.Vector3(295, 146,-659)
  let p10=new THREE.Vector3(295, 148,-658)
  let p11=new THREE.Vector3(295, 148,-590)

 // 创建线条一：直线
 let line1 = new THREE.LineCurve3(p1,p2);
 // 重建线条2：三维样条曲线
 let curve = new THREE.CatmullRomCurve3([p2, p3, p4]);
 // 创建线条3：直线
 let line2 = new THREE.LineCurve3(p4,p5);
  // 重建线条2：三维样条曲线
 let curve2 = new THREE.CatmullRomCurve3([p5, p6, p7]);
 let line3= new THREE.LineCurve3(p7,p8);
 let curve3 = new THREE.CatmullRomCurve3([p8, p9, p10]);
 let line4= new THREE.LineCurve3(p10,p11);
 let CurvePath = new THREE.CurvePath();// 创建CurvePath对象


 CurvePath.curves.push(line1, curve, line2,curve2,line3,curve3,line4);// 插入多段线条
 createPipeline(scene,CurvePath)

}

//创建1水流
const createLine2=(scene)=>{
  // 创建多段线条的顶点数据

  let p1=new THREE.Vector3(295, 148,-530)
  let p2=new THREE.Vector3(295, 148,-440)
 // 创建线条一：直线
 let line1 = new THREE.LineCurve3(p1,p2);
 
 let CurvePath = new THREE.CurvePath();// 创建CurvePath对象
 CurvePath.curves.push(line1);// 插入多段线条
 createPipeline(scene,CurvePath)

}



 const initLine=(scene)=>{
  createLine1(scene)
  createLine2(scene)
}

const waterAnimate=()=>{
  pipleMaterial.offset.x -=0.02
}
export { initLine,waterAnimate}