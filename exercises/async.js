function msleep(msecs) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
        // No failure possible, so we are not using reject
            resolve();
        }, msecs);
    });
}

async function count_down() {
    await msleep(1000);
    log("one");
    await msleep(1000);
    log("dos");
    await msleep(1000);
    log("trois");
    await msleep(1000);
    log("vier");
    await msleep(1000);
    log("bost");
    await msleep(1000);
    log("Do something");
}

count_down();
