
import firebase from 'firebase';

export class AuthenticationService {

  constructor(){
  }



  signup(email: string, password: string){
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }

  signin(email: string, password:string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  setUserDisplayName(name:string){
    return firebase.auth().currentUser.updateProfile({displayName:name, photoURL:''});
  }

  getUserId() {
    return firebase.auth().currentUser.getIdToken();
  }

  isSignedIn(){
    if(this.getActiveUser() != null){
      return true;
    }
    else {
      return false;
    }
  }

  isEmailVerified() {
    return firebase.auth().currentUser.emailVerified;
  }

  logout() {
    return firebase.auth().signOut();
  }

  getActiveUser() {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
  }

  deleteAccount(){
    return firebase.auth().currentUser.delete();
  }

  disableAccount(){

  }
}
