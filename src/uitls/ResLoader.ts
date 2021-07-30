class ResLoader {
    actions: Function[] = []
    errCount: number = 0;
    loadedCount: number = 0;
    OnProgress: Function = (current: number, total: number) => {
        console.log(`正在加载资源： ${current}/${total}`)
    }
    Add(action: Function) {
        this.actions.push(action);

    }
    Start() {
        for (const action of this.actions) {
            // this.promises.push(new Promise<void>((reslove, reject) => {
            //     try {
            //         action();
            //         reslove();
            //         this.loadedCount++
            //         this.OnProgress()
            //     } catch (error) {
            //         this.errCount++
            //         this.loadedCount++
            //         this.OnProgress()
            //         reject(error)
            //     }
            // }));
        }
    }

}


export default ResLoader