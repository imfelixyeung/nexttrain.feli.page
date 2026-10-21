export const jc = (classes: any[]) => {
    return classes.filter((e) => !!e).join(" ");
};
