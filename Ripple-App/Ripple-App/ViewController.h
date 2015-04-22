//
//  ViewController.h
//  Ripple-App
//
//  Created by William O'Connor on 4/16/15.
//  Copyright (c) 2015 Gooey Dee Bee. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreLocation/CoreLocation.h>

@interface ViewController : UIViewController <UITableViewDataSource, UITableViewDelegate, AVAudioPlayerDelegate, CLLocationManagerDelegate>

@property (nonatomic, strong) NSArray *tracks;
@property (nonatomic, strong) AVAudioPlayer *player;
@property(nonatomic, strong) CLLocationManager *locationManager;

@end

