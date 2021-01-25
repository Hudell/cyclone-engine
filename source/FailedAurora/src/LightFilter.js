export const vertexGeneral = `
  attribute vec2 aVertexPosition;
  attribute vec2 aTextureCoord;

  varying vec2 vTextureCoord;

  uniform mat3 projectionMatrix;

  void main(void) {
    vTextureCoord = aTextureCoord;
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  }
`;

export const vertexFlipY = `
  attribute vec2 aVertexPosition;
  attribute vec2 aTextureCoord;

  varying vec2 vTextureCoord;
  varying float flipY;

  uniform mat3 projectionMatrix;

  void main(void) {
    flipY = projectionMatrix[1][1] < 0.0 ? 1.0 : 0.0;
    vTextureCoord = aTextureCoord;
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  }
`;

export const fragmentLighting = `
  varying vec2 vTextureCoord;

  uniform vec2 screenResolution;
  uniform sampler2D uSampler;
  uniform vec4 ambientLight;

  void main(void) {
    vec4 light = texture2D(uSampler, vTextureCoord);
    gl_FragColor = light + ambientLight;
  }`;

export class LightFilter extends PIXI.Filter {
  constructor() {
    super(vertexGeneral, fragmentLighting, {
      screenResolution: {
        type: 'vec2',
        value: [0, 0],
      },
      ambientLight: {
        type: 'vec4',
        value: [0, 0, 0, 0],
      },
    });
    this.initialize();
  }

  initialize() {

  }

  copyUniforms(filter) {
    for (let uniform in filter.uniforms) {
      if (filter.uniforms.hasOwnProperty(uniform) && this.uniforms.hasOwnProperty(uniform)) {
        this.uniforms[uniform] = filter.uniforms[uniform];
      }
    }
  }

  setResolution(width, height) {
    this.program.uniformData.screenResolution.value[0] = width;
    this.program.uniformData.screenResolution.value[1] = width;
    // this.uniforms.screenResolution.value[0] = width;
    // this.uniforms.screenResolution.value[1] = height;
  }

  setLightMap(lightMap) {
    this.uniforms.lightMap = lightMap;
  }

  setAmbientLight(ambientLight) {
    this.program.uniformData.ambientlight.value[0] = ambientLight.red * ambientLight.intensity;
    this.program.uniformData.ambientlight.value[1] = ambientLight.green * ambientLight.intensity;
    this.program.uniformData.ambientlight.value[2] = ambientLight.blue * ambientLight.intensity;
    this.program.uniformData.ambientlight.value[3] = ambientLight.intensity;


    // this.uniforms.ambientLight.value[0] = ambientLight.red * ambientLight.intensity;
    // this.uniforms.ambientLight.value[1] = ambientLight.green * ambientLight.intensity;
    // this.uniforms.ambientLight.value[2] = ambientLight.blue * ambientLight.intensity;
    // this.uniforms.ambientLight.value[3] = ambientLight.intensity;
  }
}

export const LightFilterInstance = new LightFilter();