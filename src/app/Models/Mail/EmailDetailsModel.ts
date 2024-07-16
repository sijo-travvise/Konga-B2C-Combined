export class EmailDetailsModel
{
    public ToMailList: ToMailModel[]=[];
    public EmailSubject:string="";
    public EmailContent:string="";
    public IsPaymentSuccess: boolean=true;

}

export class ToMailModel
{
    public  MailId:string | undefined;
    public  Name:string="";
}