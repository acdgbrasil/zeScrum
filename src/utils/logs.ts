export const messageWithDate = (mesage:string,_color?:string) => {
    const date = Date.now();
    const dateString = new Date(date).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    console.log(`%c[${dateString}]: ` + `${mesage}`,`color:${_color ? _color : 'white'}`);
    return
}


