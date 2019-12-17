import { ComponentFixture } from '@angular/core/testing';

/**
 * Sets a property on component
 *
 * @param prop Property to set
 * @param value New value of property
 * @param comp Component to change property of
 * @param fixture Fixture from test
 */
export function setProp(
	prop: string,
	value: any,
	comp: any,
	fixture: ComponentFixture<any>,
) {
	Object.defineProperty(comp, prop, { writable: true });
	comp[prop] = value;
	fixture.detectChanges();
}

/**
 * Gets an array of specified elements
 *
 * @param fixture Fixture to get elements from
 * @param selector Defines what to select
 */
export function selectAll(fixture: ComponentFixture<any>, selector: string) {
	const el: HTMLElement = fixture.debugElement.nativeElement;
	return el.querySelectorAll(selector);
}

/**
 * Gets the specified element
 *
 * @param fixture Fixture to get elements from
 * @param selector Defines what to select
 */
export function select(fixture: ComponentFixture<any>, selector: string) {
	const el: HTMLElement = fixture.debugElement.nativeElement;
	return el.querySelector(selector);
}
