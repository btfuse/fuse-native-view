
/*
Copyright 2023-2024 Breautek 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

#import <Foundation/Foundation.h>
#import <BTFuse/BTFuse.h>
#import <BTFuseNativeView/BTFuseNativeViewContainer.h>

@implementation BTFuseNativeViewContainer {
    BTFuseContext* $context;
    NSString* $ident;
}

- (instancetype) init:(BTFuseContext*) context {
    self = [self init:context withRect:CGRectMake(0.0f, 0.0f, 0.0f, 0.0f)];
    return self;
}

- (instancetype) init:(BTFuseContext*) context withRect:(CGRect) rect {
    self = [super initWithFrame: rect];
    
    $context = context;
    NSUUID *uuid = [NSUUID UUID];
    $ident = [uuid UUIDString];
    
//    [self setBackgroundColor: [UIColor clearColor]];
    [self setBackgroundColor: [UIColor redColor]];
    
    return self;
}

- (NSString*) getID {
    return $ident;
}

@end
