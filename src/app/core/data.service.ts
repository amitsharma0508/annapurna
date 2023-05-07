import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';

export class PaymentRequest {
  messagetype!:string;
  amount!:number;
  email!:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Accept: 'application/json',
      // Authorization: `Bearer ` + this.token.jwt
    })
  }

  paymentRequest: PaymentRequest;

  constructor(
    private http: HttpClient
  ) {
    this.paymentRequest = new PaymentRequest();

  }

  getAppVersion(){
    return this.http.get(`${API_URL}/appversion`, this.httpOptions );
  }

  getAdvertisementImages(){
    return this.http.get(`${API_URL}/getAdvertisements`, this.httpOptions);
  }

  // getLineOfBusinesses(){
  //   return this.http.get(`${API_URL}/lineofbusiness`, {}, {});
  // }

  // getLineOfBusinessById(id: any){
  //   return this.http.get(`${API_URL}/lineofbusinessdetails?id=${id}`, {}, {});
  // }

  postFeedBack(subject: any, message: any){
    const url = `${API_URL}/sendmail?to=feedback@ricb.bt&from=ricbfeedback@gmail.com&subject=${subject}&message=${message}`;
    const requestUrl = encodeURI(url);
    return this.http.get(requestUrl, this.httpOptions);
  }

  // postUserRegistration(uname: any, password: any, mobileNo: any, email: any, cidNo: any, otp: any) {
  //   const url = `${API_URL}/adduserdetails?userName=${uname}&password=${password}&phoneNo=${mobileNo}&email=${email}&cidNumber=${cidNo}&otp=${otp}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http.get(requestUrl, {}, {});
  // }

  // forgotPassword(cidNo: any, otp: any){
  //   const url = `${API_URL}/forgotpasswordotp?cidNumber=${cidNo}&otp=${otp}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http.get(requestUrl, {}, {});
  // }

  // verifyOTP(otp: any, cidNo: any){
  //   const url = `${API_URL}/verifyotp?cid=${cidNo}&otp=${otp}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // resetPassword(cidNo: any, mobileNo: any, password: any){
  //   const url = `${API_URL}/updatePassword?cidNo=${cidNo}&mobileNo=${mobileNo}&newPassword=${password}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // sendSMS(smsContent: any, mobileNo: any) {
  //   const url = `http://202.144.136.77/api/gateway.aspx?action=send&username=ricb&passphrase=12345678&message=${smsContent}&phone=${mobileNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  userProfile(cidNo: any): any{
    const url = `${API_URL}/getUserprofile/${cidNo}`;
    const requestUrl = encodeURI(url);
    return this.http
      .get(requestUrl, this.httpOptions);
  }

  getCreditInvestment(cidNo: any){

    // const url = `http://apps.ricb.com.bt/MyRICBapi/creditAccount.php?cid=${cidNo}`;
    //  const url = `https://apps.ricb.bt/mbob/credit.php?cid=${cidNo}`;

    const url = `${API_URL}/ricb/creditInvestment?cidNo=${cidNo}`;
    const requestUrl = encodeURI(url);
    return this.http
      .get(requestUrl, this.httpOptions);

  }

  getLifeInsurance(cidNo: any){
    const url = `${API_URL}/ricb/getLifeInsuraceDetails/${cidNo}`;
    const requestUrl = encodeURI(url);
    return this.http
      .get(requestUrl, this.httpOptions);
  }

  // getLifeInsuranceDetails(policyNo: any){
  //   const url = `${API_URL}/generalinsurancedetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // // getGeneralInsuranceReportDtls(policyNo,prodCode){
  // //   const url = `${API_URL}/getGeneralInsuranceReportDtls?policyNo=${policyNo}&prodCode=${prodCode}`;
  // //   const requestUrl = encodeURI(url);
  // //   return this.http
  // //     .get(requestUrl, {}, {});
  // // }

  // //MTP & OTIP policy report details
  // getGeneralInsuranceDtls(policyNo: any){
  //   const url = `${API_URL}/getGeneralInsuranceDtls?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getGeneralInsurance(cidNo: any){
  //   const url = `${API_URL}/geninsurance?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getMotorTpPolicy(cidNo: any){
  //   const url = `${API_URL}/motortppolicy?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getMotorTpActivePolicy(cidNo: any){
  //   const url = `${API_URL}/motortpactivepolicy?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getOTIPActivePolicy(cidNo: any){
  //   const url = `${API_URL}/otipactivepolicy?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getGeneralActivePolicy(cidNo: any){
  //   const url = `${API_URL}/generalactivepolicy?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getOtipCustomerDetail(cidNo: any){
  //   const url = `${API_URL}/getOtipCustomer?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getCountry(){
  //   return this.http.get(`${API_URL}/getcountry`, {}, {});
  // }
  // getTitle(){
  //   return this.http.get(`${API_URL}/gettitle`, {}, {});
  // }
  // getMstatus(){
  //   return this.http.get(`${API_URL}/getMstatus`, {}, {});
  // }
  // getContactType(){
  //   return this.http.get(`${API_URL}/getContactType`, {}, {});
  // }
  // choosePlan(age: any,days: any,cidNo: any){
  //   const url = `${API_URL}/getotipplan?age=${age}&days=${days}&cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // choosePlanJp(age: any,days: any,cidNo: any){
  //   const url = `${API_URL}/getotipplanjp?age=${age}&days=${days}&cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // choosePlanAsian(age: any,days: any,cidNo: any){
  //   const url = `${API_URL}/getotipplanasian?age=${age}&days=${days}&cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // choosePlanAll(age: any,days: any,cidNo: any){
  //   const url = `${API_URL}/getotipplanall?age=${age}&days=${days}&cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // confirmOtipPlan(age: any,days: any,plan: any){
  //   const url = `${API_URL}/getotipplanfinal?age=${age}&days=${days}&plan=${plan}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getSeqId(){
  //   return this.http.get(`${API_URL}/getSeqId`, {}, {});
  // }


  // getRuralLife(cidNo: any){
  //   const url = `${API_URL}/getrurallife?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getRuralMember(cidNo: any,uwYear: any){
  //   const url = `${API_URL}/getruralmember?cidNo=${cidNo}&uwYear=${uwYear}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getRuralDtl(cidNo: any,uwYear: any){
  //   const url = `${API_URL}/getrurallife?cidNo=${cidNo}&uwYear=${uwYear}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }


  // checkRuralLifePayment(serialNo: any){
  //   const url = `${API_URL}/checkrlpayment?serialNo=${serialNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getGeneralclaims(cidNo: any){
  //   const url = `${API_URL}/genclaimothers?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  trackGeneralclaims(cidNo: any){
    const url = `${API_URL}/ricb/genclaimothers?cidNo=${cidNo}`;
    const requestUrl = encodeURI(url);
    return this.http
      .get(requestUrl, this.httpOptions);
  }
  // getClaimStatusDetails(policyNo: any){
  //   const url = `${API_URL}/genclaimStatus?accountNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getImmediateAnnuity(cidNo: any){
  //   const url = `${API_URL}/immediateannuity?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getImmediateAnnuityDetails(policyNo: any){
  //   const url = `${API_URL}/immediateannuitydetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getDeferredAnnuity(cidNo: any){
  //   const url = `${API_URL}/deferredannuity?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getGeneralClaimOthersDetails(policyNo: any){
  //   const url = `${API_URL}/geninsurancedetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getCreditInvestmentDetails(policyNo: any){
  //   const url = `http://apps.ricb.com.bt/MyRICBapi/creditDetails.php?cid=${policyNo}`;
  //   // const url = `${API_URL}/creditinvestmentdetails?accountNo=${policyNo}`;

  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getGeneralInsuranceDetails(policyNo: any){
  //   const url = `${API_URL}/geninsurancedetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getMotorInsuranceDetails(policyNo: any){
  //   const url = `${API_URL}/motorinsurancedetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getMotorDetails(policyNo: any){
  //   const url = `${API_URL}/motordetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }
  // getMTPDetails(policyNo: any){
  //   const url = `${API_URL}/mtpdetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getDeferredAnnuityDetails(policyNo: any){
  //   const url = `${API_URL}/deferredannuitydetails?policyNo=${policyNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  getUserProfile(cidNo: any){
    const url = `${API_URL}/userprofile?cidNo=${cidNo}`;
    const requestUrl = encodeURI(url);
    return this.http
      .get(requestUrl, this.httpOptions);
  }

  // postPayment(cidNo: any, customerName: any, departmentCode: any, policyNo: any, amountToPay: any, orderNo: any, remitterCid: any){
  //   const url = `${API_URL}/insertLifePayment?cidNo=${cidNo}&custName=${customerName}&deptCode=${departmentCode}&policyNo=${policyNo}&amount=${amountToPay}&orderNo=${orderNo}&remitterCid=${remitterCid}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // sendARRequest(amountToPay: any){
  //   this.paymentRequest.messagetype = 'AR';
  //   this.paymentRequest.amount = amountToPay;
  //   this.paymentRequest.email = 'feedback@ricb.bt';
  //   const request = JSON.stringify(this.paymentRequest);

  //   const url = `${API_URL}/paymentrequest?messagetype=AR&amount=${amountToPay}&email=feedback@ricb.bt`;
  //   const requestUrl = encodeURI(url);

  //   return this.http
  //   //.post(`${API_URL}/paymentrequest`, {request}, {});
  //   .get(requestUrl, {}, {});
  // }

  // sendAERequest(transactionId: any, bankId: any, accountNo: any){
  //   const url = `${API_URL}/accountenq?messagetype=AE&benf_TxnId=${transactionId}&bfs_remitterBankId=${bankId}&bfs_remitterAccNo=${accountNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //   .get(requestUrl, {}, {});
  // }

  // sendDRRequest(transactionId: any, otp: any){
  //   const url = `${API_URL}/finalPaymentRequest?messagetype=DR&benf_TxnId=${transactionId}&bfs_remitterOtp=${otp}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //   .get(requestUrl, {}, {});
  // }

  // getPPFMemo(cidNo: any){
  //   const url = `${API_URL}/ppfmemo?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // getGISReport(cidNo: any){
  //   const url = `${API_URL}/gis?cidNo=${cidNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //     .get(requestUrl, {}, {});
  // }

  // updatePaymentDetails(transactionId: any, bankId: any, accountNo: any, debitAuthCode: any, orderNo: any){
  //   const url = `${API_URL}/updatePaymentFinal?txnId=${transactionId}&remitterBank==${bankId}&accNo=${accountNo}&authCode=${debitAuthCode}&orderNo=${orderNo}`;
  //   const requestUrl = encodeURI(url);
  //   return this.http
  //   .get(requestUrl, {}, {});
  // }
}
