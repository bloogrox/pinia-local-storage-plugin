# Usage
```
import createPersistPlugin from 'https://bloogrox.github.io/pinia-local-storage-plugin/index.js';


const pinia = Pinia.createPinia();

const plugin = createPersistPlugin({bucket: "... project name, localStorage key"});
pinia.use(plugin);
```

