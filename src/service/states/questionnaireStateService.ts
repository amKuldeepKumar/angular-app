import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs";


interface UserDetails {
    personalDetails: {
        title: string,
        fullName: string,
        otherName: string,
        address: string,
        occupation: string,
        dayTimeTelephoneNumber: string,
        mobileNo: string,
        emailAddress: string,
        dateOfBirth: string,
        maritalStatus: string,
        ukResidentPermanently: string

    }
}

interface QuestionnaireState{
    willInformation:{
        personalDetails:{}
    }
}

@Injectable({
    providedIn: 'root',
})
export class QuestionnaireStateService {

    private initialState:QuestionnaireState = {
        willInformation:{
            personalDetails: {
                title: 'mr',
                fullName: 'kuldeep kumar angural',
                otherName: 'navv',
                address: 'pathankot, punjab , india , 145001',
                occupation: 'Senior software engineer',
                dayTimeTelephoneNumber: '01862262561',
                mobileNo: '9855171485',
                emailAddress: 'kuldeep.navv@gmail.com',
                dateOfBirth: "1995-02-13",
                maritalStatus: 'single',
                ukResidentPermanently: 'yes'
            }
        }
    };


    private stateSubject = new BehaviorSubject<QuestionnaireState>(this.initialState);
    public questionnaireState: Observable<QuestionnaireState> = this.stateSubject.asObservable();

    private updateState(newState: Partial<UserDetails>): void {
        const currentState = this.stateSubject.getValue();
        this.stateSubject.next({ ...currentState, ...newState });
    }

    updateUserInformation(data: any) {
        this.updateState(data);
    }

}