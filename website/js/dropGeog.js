// need to handle hemispheres (i believe that this will)
// how to handle areas at equator and prime meridian

// think of regions as starting with region 1 at 12:00, and then moving around in clockwise direction

function Latitude(hemi, degree) {
	this.hemisphere = hemi;
	this.degree = degree;
}

function Longitude() {
	this.hemisphere = hemi;
	this.degree = degree;
}

function Region(boundary1, boundary2, boundary3, boundary4) {
	this.boundary1 = boundary1;
	this.boundary2 = boundary2;
	this.boundary3 = boundary3;
	this.boundary4 = boundary4;
}

function SurroundingRegion(region1, region2, region3, region4, region5, region6, region7, region8) {
	// parameters are all of type Region
	this.region1 = region1;
	this.region2 = region2;
	this.region3 = region3;
	this.region4 = region4;
	this.region5 = region5;
	this.region6 = region6;
	this.region7 = region7;
	this.region8 = region8;

	this.max_lat = this.region1.boundary1;
	this.min_lat = this.region5.boundary3;
	this.max_lon = this.region3.boundary2;
	this.min_lon = this.region7.boundary4;

}

function getArea(latitude, longitude) {
	// need to use the latitude and longitude to get the 1 degree by one degree area in which it falls
	// can do that by simply truncating decimals
	
	var south = new Latitude(0, int(latitude)); 
	var north = new Latitude(0, int(latitude) + 1);

	var west = new Longitude(0, int(longitude));
	var east = new Longitude(0, int(longitude) + 1);

	var area = new Region(north, east, south, west);

	return area;

}

function getSurroundingArea(area) {
	// if area2 > 180, then area2 = -180 + (area2 % 180)
	// if area4 < -180, then area4 = 180 - (area4 % 180)

	// if area1 > 90, then area1 = -90 + (area1 % 90)
	// if area3 < -90, then area3 = 90 - (area3 % 90)

	var area1 = area.boundary1;
	var area2 = area.boundary2;
	var area3 = area.boundary3;
	var area4 = area.boundary4;



	var r1 = new Region(latPlusOne(area1), area2, latPlusOne(area3), area4);
	var r2 = new Region(latPlusOne(area1), longPlusOne(area2), latPlusOne(area3), longPlusOne(area4));
	var r3 = new Region(area1, longPlusOne(area2), area3, longPlusOne(area4));
	var r4 = new Region(latMinusOne(area1), longPlusOne(area2), latMinusOne(area3), longPlusOne(area4));
	var r5 = new Region(latMinusOne(area1), area2, latMinusOne(area3), area4);
	var r6 = new Region(latMinusOne(area1), longMinusOne(area2), latMinusOne(area3), longMinusOne(area4));
	var r7 = new Region(area1, longMinusOne(area2), area3, longMinusOne(area4));
	var r8 = new Region(latPlusOne(area1), longMinusOne(area2), latPlusOne(area3), longMinusOne(area4));

	var surroundingRegion = new SurroundingRegion(r1, r2, r3, r4, r5, r6, r7, r8);

	return surroundingRegion;
}

function latPlusOne(latitude) {
	var lat = latitude + 1;
	if (lat > 90) {
		lat = (lat%90)-90;
	}
	return lat;
}

function latMinusOne(latitude) {
	var lat = latitude - 1;
	if (lat < -90) {
		lat = 90 - (lat%(-90));
	}
	return lat;
}

function longPlusOne(longitude) {
	var longi = longitude + 1;
	if (longi > 180) {
		longi = (longi%180)-180;
	}
	return longi;
}

function longMinusOne(longitude) {
	var longi = longitude - 1;
	if (longi < -180) {
		longi = 180-(longi%(-180));
	}
	return longi;

}
