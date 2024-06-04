export class OpcionesRespuesta {
    option: string;
    isText: boolean;

    constructor(
        {
            option,
            isText,
        }:
            {
                option: string,
                isText: boolean
            }) {
        this.option = option;
        this.isText = isText;
    }
}
