<template>
    <div id ="three_content"></div>
</template>

<script>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
const TWEEN = require('@tweenjs/tween.js')
import {initLine,waterAnimate}  from '../../assets/js/tube'
import {canvasPlan,canvasImg}  from '../../assets/js/canvas'
import * as dat from 'dat.gui';
import Stats from 'stats.js'
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var params={
       x:0,
       y:50,
       z:0
 }
const gui = new dat.GUI();

export default {
  data(){
    return {
      camera:'',
      scene:'',
      renderer:'',
      stats :'',
      contorls:null,
       selectMeshName:'',//选中的设备name
    }
  },
  mounted(){

    this.init()
        const position={x: -1570,y:300,z:0}
        var target = { x :-800, y: 300,z:-800}; 
    var target2 = { x : -300, y: 300,z:-400};  
    let tween=new TWEEN.Tween(position).delay(5000).to(target, 10000).to(target2, 10000).easing(TWEEN.Easing.Linear.None).start() 
    tween.onUpdate((obj)=> {
      this.camera.position.x=obj.x
      this.camera.position.y=obj.y
      this.camera.position.z=obj.z
       this.camera.lookAt(this.scene.position)

    });
    window.addEventListener( 'click', this.onMouseClick, false );
  },
  methods:{
   async  init() {
      this.initScene()
      this.initLight()
      this.initAxis()
      this.initRender()
      this.createFloor()
     // this.createObjModel('/model/sheliubeng3D.obj','/model/sheliubeng3D.mtl',{x:0,y:0,z:0,scale:0.1},'sheliubeng3D')
      this.createObjModel('/model/jianzhuwu3D.obj','/model/jianzhuwu3D.mtl',{x:600,y:41,z:-475,scale:0.1,rotateY:Math.PI},'jianzhuwu3D')
      this.createObjModel('/model/jianzhuwu3D.obj','/model/jianzhuwu3D.mtl',{x:600,y:41,z:-200,scale:0.1,rotateY:Math.PI},'jianzhuwu3D2')
    //  池子
     this.createObjModel('/model/chizi3D.obj','/model/chizi3D.mtl',{x:632,y:41,z:300,scale:0.1,rotateY:Math.PI},'chizi3D')

    
       //超滤
       this.createObjModel('/model/chaolv3D.obj','/model/chaolv3D.mtl',{x:200,y:78,z:-560,scale:0.1},'chaolv3D')
       this.createObjModel('/model/chaolv3D.obj','/model/chaolv3D.mtl',{x:200,y:78,z:-410,scale:0.1},'chaolv3D2'
       
       
       )
       //设射流泵
     this.createObjModel('/model/sheliubeng3D.obj','/model/sheliubeng3D.mtl',{x:60,y:18,z:-220,scale:0.1},'sheliubeng3D')
     this.createObjModel('/model/sheliubeng3D.obj','/model/sheliubeng3D.mtl',{x:60,y:18,z:-160,scale:0.1},'sheliubeng3D2')
     this.createObjModel('/model/sheliubeng3D.obj','/model/sheliubeng3D.mtl',{x:60,y:18,z:285,scale:0.1},'sheliubeng3D2')
      this.createObjModel('/model/sheliubeng3D.obj','/model/sheliubeng3D.mtl',{x:60,y:18,z:365,scale:0.1},'sheliubeng3D2')

//罐子
      this.createObjModel('/model/qingyeguan3D.obj','/model/qingyeguan3D.mtl',{x:280,y:78,z:-200,scale:0.1},'qingyeguan3D')

      this.createObjModel('/model/nalvfanshentou3D.obj','/model/nalvfanshentou3D.mtl',{x:200,y:58,z:10,scale:0.1,rotateY:Math.PI},'nalvfanshentou3D')
       this.createObjModel('/model/nalvfanshentou3D.obj','/model/nalvfanshentou3D.mtl',{x:200,y:58,z:160,scale:0.1,rotateY:Math.PI},'nalvfanshentou3D')
       

        this.createObjModel('/model/qingyeguan3D.obj','/model/qingyeguan3D.mtl',{x:280,y:78,z:300,scale:0.1},'qingyeguan3D')

        
      this.createObjModel('/model/nalvfanshentou3D.obj','/model/nalvfanshentou3D.mtl',{x:200,y:58,z:450,scale:0.1,rotateY:Math.PI},'nalvfanshentou3D')
       this.createObjModel('/model/nalvfanshentou3D.obj','/model/nalvfanshentou3D.mtl',{x:200,y:58,z:600,scale:0.1,rotateY:Math.PI},'nalvfanshentou3D')
      //this.createDracolModel('/model/MBRjinshuibeng3D.drc','/MBRjinshuibeng3D.mtl',{x:0,y:0,z:0,scale:0.1},'MBRjinshuibeng3D')

       //冷却塔
         this.createObjModel('/model/lengqueta3.obj','/model/lengqueta3.mtl',{x:-370,y:35,z:-530,scale:0.1,rotateY:Math.PI},'nalvfanshentou3D')
       //罐子
      this.createObjModel('/model/qingyeguan3D.obj','/model/qingyeguan3D.mtl',{x:-350,y:76,z:-400,scale:0.1},'qingyeguan3D')
       this.createObjModel('/model/qingyeguan3D.obj','/model/qingyeguan3D.mtl',{x:-350,y:76,z:-200,scale:0.1},'qingyeguan3D')
       this.createObjModel('/model/qingyeguan3D.obj','/model/qingyeguan3D.mtl',{x:-350,y:149,z:100,scale:0.2},'qingyeguan3D')
           this.createObjModel('/model/qingyeguan3D.obj','/model/qingyeguan3D.mtl',{x:-350,y:149,z:450,scale:0.2},'qingyeguan3D')
          //  冷却塔

        this.createObjModel('/model/lengqueta3.obj','/model/lengqueta3.mtl',{x:-450,y:35,z:-40,scale:0.1,rotateY:Math.PI},'nalvfanshentou3D')
               //  池子
      this.createObjModel('/model/chizi3D.obj','/model/chizi3D.mtl',{x:-850,y:42,z:0,scale:0.1,rotateY:Math.PI},'chizi3D')
      initLine(this.scene)
      canvasPlan(this.scene)
      canvasImg(this.scene)
      this.render()
      this.initControl()
    },
    createFloor(){//创建地板
      let floor=new THREE.PlaneGeometry(3500,2000,32)
      let textLoader=new THREE.TextureLoader()
      textLoader.load('/img/back.jpg',(texture)=>{
        texture.wrapS=texture.wrapT=THREE.RepeatWrapping
        texture.repeat.set(5,5)
        let floorMaterial=new THREE.MeshLambertMaterial({
              map:texture,
              side:THREE.DoubleSide,
              // transparent:true,
              // opacity:0.7,
              emissive: '#081838',
              emissiveIntensity: 0.15,

         })
         let mesh=new THREE.Mesh(floor,floorMaterial)
         mesh.receiveShadow=true
         mesh.rotation.x=Math.PI/2
         this.scene.add(mesh)
      })
      

    },

    initAxis(){
      ///添加辅助
     let axis=new THREE.AxisHelper(500)
     this.scene.add(axis)

     //状态值
     let stats=new Stats();
     stats.domElement.style.position = 'absolute'; //绝对坐标  
     stats.domElement.style.left = '0px';// (0,0)px,左上角  
     stats.domElement.style.top = '0px';  
     document.getElementById('three_content').appendChild(stats.domElement);  
     this.stats=stats

      gui.add(params, 'x', -1500, 1500)
          .onChange( (val)=> {
                let mesh=this.scene.getObjectByName(this.selectMeshName);
                mesh.position.x=val
      });
      gui.add(params, 'y', -1500, 1500)
          .onChange( (val)=> {
                let mesh=this.scene.getObjectByName(this.selectMeshName);
                mesh.position.y=val
      });
        gui.add(params, 'z', -1500, 1500)
          .onChange( (val)=> {
                let mesh=this.scene.getObjectByName(this.selectMeshName);
                mesh.position.z=val
      });
      

    },
    initScene(){//渲染场景
      let container = document.getElementById('three_content');
      let innerWidth=container.clientWidth
      let innerHeigt=container.clientHeight 
      this.camera = new THREE.PerspectiveCamera(45, innerWidth /innerHeigt , 1, 100000 );
      this.camera.position.set(-1570, 300, 0); 
      this.scene = new THREE.Scene();
    },
    initControl(){//渲染鼠标事件
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
     // this.controls.addEventListener('change', this.render)
    },
    initRender(){///初始化渲染器
      let container = document.getElementById('three_content');
      let innerWidth=container.clientWidth
      let innerHeigt=container.clientHeight 
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize( innerWidth, innerHeigt );
      this.renderer.setClearColor(0xb9d3ff, 1)
      this.camera.lookAt(this.scene.position)
      container.appendChild(this.renderer.domElement);
    },
    render(){///重新渲染
      this.renderer.render(this.scene, this.camera);
      this.stats.update()
      TWEEN.update()
      waterAnimate()
      requestAnimationFrame(this.render)
    },
    initLight(){
       let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.15);//模拟远处类似太阳的光源
            // 设置阴影
            directionalLight.color.setHSL(0.1, 1, 0.95);
            directionalLight.position.set(0, 1000, -1000).normalize();
            directionalLight.castShadow = true
             this.scene.add(directionalLight);

            let directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.15);//模拟远处类似太阳的光源
            // 设置阴影
            directionalLight1.color.setHSL(0.1, 1, 0.95);
            directionalLight1.position.set(0, 1000, 1000).normalize();
            directionalLight1.castShadow = true
             this.scene.add(directionalLight1);

            let directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.15);//模拟远处类似太阳的光源
            // 设置阴影
            directionalLight2.color.setHSL(0.1, 1, 0.95);
            directionalLight2.position.set(0, 100, -1000).normalize();
            directionalLight2.castShadow = true
             this.scene.add(directionalLight2);

            let directionalLight3 = new THREE.DirectionalLight(0xFFFFFF, 0.15);//模拟远处类似太阳的光源
            // 设置阴影
            directionalLight3.color.setHSL(0.1, 1, 0.95);
            directionalLight3.position.set(0, 100, 1000).normalize();
            directionalLight3.castShadow = true
             this.scene.add(directionalLight3);

            // var directionalLight4 = new THREE.DirectionalLight(0xFFFFFF, 0.10);//模拟远处类似太阳的光源
            // // 设置阴影
            // directionalLight4.color.setHSL(0.1, 1, 0.95);
            // directionalLight4.position.set(0, 1000, 0).normalize();
            // directionalLight4.castShadow = true
            // scene.add(directionalLight4);


            // var helper = new THREE.CameraHelper( directionalLight.shadow.camera );
            // scene.add( helper );    

            let ambient = new THREE.AmbientLight(0xffffff, 0.9); //AmbientLight,影响整个场景的光源
            ambient.position.set(0, 0, 0);
            this.scene.add(ambient);
    },
     createObjModel(objUrl,mtlUrl,params,name){///创建obj模型跟材质
       let objLoader=  new OBJLoader();
       let mtlLoader=  new MTLLoader()
        mtlLoader.load(mtlUrl,(material)=>{
          objLoader.setMaterials(material)
          objLoader.load(objUrl,(mesh)=>{
               mesh.name=name
               let scale=params.scale
               mesh.scale.set(scale,scale,scale)
               if(params.rotateY){
                   mesh.rotateY(params.rotateY)
               }
               mesh.position.x=params.x
               mesh.position.y=params.y
              mesh.position.z=params.z
              this.scene.add(mesh)
          })

       })


    },
     createDracolModel(drcUrl,mtlUrl,params,name){///创建模型跟材质
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/model//libs/draco/');
    dracoLoader.preload();
     dracoLoader.load( drcUrl, (geometry)=> {
            let mtlLoader = new MTLLoader();
            mtlLoader.setPath('obj/');
            mtlLoader.load(mtlUrl,  (materials)=> {
                materials.preload();
                let material = [];


                let mesh = new THREE.Mesh(geometry, materials.materials['lansecaizhi']);
                mesh.name = '1#生化进水泵,2#生化进水泵';
                mesh.clickId = '3'
                mesh.scale.set(0.1, 0.1, 0.1)
                mesh.rotateY(Math.PI)
                mesh.position.y = 18
                mesh.position.z = 500
                mesh.position.x = -500
                this.scene.add(mesh);
          
            });



        }
    );




    },

    onMouseClick( event ) {///鼠标点击时间

        //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera( mouse, this.camera );

        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects( this.scene.children , true);

        //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        for ( var i = 0; i < intersects.length; i++ ) {
          let selectName= intersects[i].object.parent.name
           if(selectName) {
            let groupMsg=intersects[i].object.parent
            console.log(groupMsg.position.x)
            //  params.position.x=groupMsg.position.x
            //  params.position.y=groupMsg.position.y
            //  params.position.z=groupMsg.position.z
             this.selectMeshName=selectName
           /// intersects[i].object.material.color.set( 0xff0000 );
           }
            

        }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#three_content{
height: 100%;
width: 100%;
}
</style>
