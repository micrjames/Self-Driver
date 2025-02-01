import { KeyMappings } from "./utils";

export class Controls {
   private _forward!: boolean;
   private _left!: boolean;
   private _right!: boolean;
   private _reverse!: boolean;

   private keyMappings: KeyMappings;
   constructor() {
	  this.keyMappings = {
		 'ArrowLeft': '_left',
		 'ArrowRight': '_right',
		 'ArrowUp': '_forward',
		 'ArrowDown': '_reverse'
	  };

	  /*
	  this._forward = false;
	  this._left = false;
	  this._right = false;
	  this._reverse = false;
	  */

	  for (let key in this.keyMappings) {
          // Use the value from keyMappings as the property name
		  // this[this.keyMappings[key]] = false;
          (this as any)[this.keyMappings[key]] = false;
      }

	  this.setupKeyEvents();
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

   private setupKeyEvents() {
	  // handleKeyEvent.call(this, event, boolean)
	  document.onkeydown = (event: KeyboardEvent) => this.handleKeyEvent(event, true);
	  document.onkeyup = (event: KeyboardEvent) => this.handleKeyEvent(event, false); 
   }
   private handleKeyEvent(event: KeyboardEvent, value: boolean) {
	  const key = this.keyMappings[event.key];
	  if(key) {
		 // this[key] = value;
		 // this[key as keyof this] = value;
		 // (this as Record<typeof key, boolean>)[key] = value;
		 (this as unknown as Record<typeof key, boolean>)[key] = value;
			// we’re accessing a valid property of this
			// — treat key as one of the keys of this, allowing the assignment.
		 console.table(this);
	  }
	  /*
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
	  */
   }
}
