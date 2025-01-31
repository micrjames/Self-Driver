export class Controls {
   private _forward: boolean;
   private _left: boolean;
   private _right: boolean;
   private _reverse: boolean;
   constructor() {
	  this._forward = false;
	  this._left = false;
	  this._right = false;
	  this._reverse = false;

	  this.addKeyboardListeners();
   }

   get forward(): boolean {
	  return this._forward;
   }
   get left(): boolean {
	  return this._left;
   }
   get right(): boolean {
	  return this._right;
   }
   get reverse(): boolean {
	  return this._reverse;
   }

   private addKeyboardListeners() {
	   document.onkeydown = (event: KeyboardEvent) => {
			 switch(event.key) {
				  case 'ArrowLeft':
					  this._left = true;
				  break;
				  case 'ArrowRight':
					  this._right = true;
				  break;
				  case 'ArrowUp':
					  this._forward = true;
				  break;
				  case 'ArrowDown':
					  this._reverse = true;
				  break;
			  }
			  console.table(this);
	   };
	   document.onkeyup = event => {
		   switch(event.key) {
			   case 'ArrowLeft':
				   this._left = false;
			   break;
			   case 'ArrowRight':
				   this._right = false;
			   break;
			   case 'ArrowUp':
				   this._forward = false;
			   break;
			   case 'ArrowDown':
				   this._reverse = false;
			   break;
		  }
		  console.table(this);
	  };
   }
}
