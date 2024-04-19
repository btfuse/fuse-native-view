
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
#import <BTFuseNativeView/BTFuseNativeViewRect.h>

@implementation BTFuseNativeViewRect

+ (CGRect) fromJSON:(NSDictionary*) rect {
    CGFloat x = [[rect objectForKey:@"x"] floatValue];
    CGFloat y = [[rect objectForKey:@"y"] floatValue];
    CGFloat w = [[rect objectForKey:@"w"] floatValue];
    CGFloat h = [[rect objectForKey:@"h"] floatValue];
    return CGRectMake(x, y, w, h);
}

@end
