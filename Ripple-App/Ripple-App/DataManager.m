//
//  DataManager.m
//  Ripple-App
//
//  Created by William O'Connor on 4/19/15.
//  Copyright (c) 2015 Gooey Dee Bee. All rights reserved.
//

#import "DataManager.h"

@implementation DataManager

+ (NSDictionary *)getSongList:(NSString*)data
{    
    return [REST_API getPath:[kRootURL stringByAppendingString:[kUser stringByAppendingString:[@"/" stringByAppendingString: data]]]];
}

@end
