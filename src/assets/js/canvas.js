import * as THREE from 'three';

const canvasPlan = (scene)=> {
  let canvas = document.createElement("canvas");
  canvas.width = 1210;
  canvas.height = 640;
 let Plan1 = canvas.getContext('2d');
  // 矩形区域填充背景
  // c.fillStyle = "#FFDC00";
  Plan1.font = "normal bold 160px 微软雅黑";
  Plan1.textAlign = "left";
  Plan1.fillStyle = "#910004";
  Plan1.fillText("一级硝化池", 200, 400);
  // Plan1.fillStyle = "red";
  // Plan1.fillText("纳滤系统2", 190, 148);
  Plan1.globalCompositeOperation = "destination-over";

  let Plan1_texture = new THREE.CanvasTexture(canvas);
  var geometry = new THREE.PlaneGeometry(1210, 640);
  let materialabc = new THREE.MeshBasicMaterial({
      map: Plan1_texture, // 设置纹理贴图
      side: THREE.DoubleSide,
      transparent: true,
  });
  // var sprite = new THREE.Sprite( materialabc );
  var mesh = new THREE.Mesh(geometry, materialabc);
  // var mesh = new THREE.Mesh(geometry, materialabc);
  mesh.rotateY(-Math.PI / 2)
  // mesh.rotateZ(Math.PI/2)
  mesh.scale.set(0.1, 0.1, 1)
  mesh.position.y = 150
  mesh.position.x = -500
  mesh.position.z = 100
  scene.add(mesh)
}

const canvasImg = (scene) =>{
      var Images_warning = new Image();
      Images_warning.src = "/img/canvas/tank.png";
      let canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 81
      let Plan1 = canvas.getContext('2d');
      Images_warning.onload =  ()=> {

         Plan1.clearRect(0,0,321,84)
        Plan1.drawImage(Images_warning,0,0);
        //Plan1.strokeRect(0,0,321,84);
        let Plan1_texture = new THREE.CanvasTexture(canvas);

        let materialabc = new THREE.SpriteMaterial({
            map: Plan1_texture, // 设置纹理贴图
            transparent:true

        });
        Plan1_texture.needsUpdate = true
        var mesh = new THREE.Sprite( materialabc );
        mesh.scale.set(321,84,1)
        mesh.rotateY(-Math.PI / 2)
        mesh.position.y =300
        mesh.position.x = 0
        mesh.position.z = 0
        scene.add(mesh)
      }
  

}
export {canvasPlan,canvasImg}