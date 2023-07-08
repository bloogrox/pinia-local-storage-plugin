function hydrateStore(store, {bucket}) {
    const fromStorage = localStorage.getItem(bucket)
    if (fromStorage) {
        store.$patch(JSON.parse(fromStorage)[store.$id])
    }
}

function persistState(state, {bucket, key}) {
    const fromStorage = localStorage.getItem(bucket);
    let data = fromStorage ? JSON.parse(fromStorage) : {};
    data[key] = state;
    localStorage.setItem(bucket, JSON.stringify(data));
}

function createPersistPlugin({bucket}) {
    return (context) => {
        const { store } = context


        store.$persist = () => {
            persistState(store.$state, {bucket, key: store.$id})
        }

        store.$hydrate = () => {
            hydrateStore(store, {bucket})
        }

        hydrateStore(store, {bucket});

        store.$subscribe(
            (_mutation, state) => {
                persistState(state, {bucket, key: store.$id})
            },
            {detached: true}
        )

        store.$onAction((ctx) => {
            ctx.after(() => {
                persistState(ctx.store.$state, {bucket, key: ctx.store.$id})
            })
        })
    }
}

export default createPersistPlugin;
