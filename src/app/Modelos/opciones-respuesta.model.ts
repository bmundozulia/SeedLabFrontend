export class OpcionesRespuesta {
    option: string;
    isText: boolean;
    isAffirmativeResponse: boolean;


    constructor(
        {
            option,
            isText,
            isAffirmativeResponse,
        }:
            {
                option?: string,
                isText?: boolean,
                isAffirmativeResponse?: boolean;
            }) {
                
        this.option = option ?? '';
        this.isText = isText ?? false;
        this.isAffirmativeResponse = isAffirmativeResponse ?? false;
    }
}
