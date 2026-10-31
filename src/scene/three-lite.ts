/**
 * A deliberately small slice of three.js.
 *
 * `vite.config.ts` aliases the bare `three` import to this module. TresJS calls
 * `extend(THREE)` with the whole namespace, which defeats tree-shaking and pulls
 * in all of three.js. Re-exporting only what we render, plus the names TresJS's own
 * internals reference, lets Rollup drop everything else.
 *
 * To use a new Tres element (e.g. `<TresTorusGeometry>`), add its class here.
 * A missing class fails loudly at runtime: "X is not defined on the THREE namespace".
 */
export {
  // TresJS internals
  ACESFilmicToneMapping,
  ArrowHelper,
  BackSide,
  BufferAttribute,
  Clock,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Float32BufferAttribute,
  Fog,
  HemisphereLightHelper,
  Layers,
  Line,
  Line3,
  LineBasicMaterial,
  Material,
  MathUtils,
  Matrix4,
  MeshBasicMaterial,
  Object3D,
  PCFShadowMap,
  PCFSoftShadowMap,
  Plane,
  PointLightHelper,
  Quaternion,
  Ray,
  Raycaster,
  REVISION,
  Scene,
  SpotLightHelper,
  Timer,
  Vector2,
  WebGLRenderer,
  // Pulled in transitively (added from build errors)
  InstancedMesh,
  Sphere,
  Triangle,
  // Used by the scene
  AmbientLight,
  BufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  SphereGeometry,
  Vector3,
} from 'three/src/Three.js'
